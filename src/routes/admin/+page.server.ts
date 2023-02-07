import { redirect, error as svelteError } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions: Actions = {
	signUp: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const data = await request.formData();

		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) throw new Error('Missing data');

		const { error, data: user } = await supabaseClient.auth.signUp({ email, password });

		if (error) {
			throw new Error(error.message);
		}
		if (user) {
			throw redirect(303, '/admin');
		}
	},
	signIn: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);

		const data = await request.formData();

		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) throw new Error('Missing data');

		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return svelteError(400, {
					message: 'Invalid credentials.'
				});
			}
			return svelteError(500, {
				message: 'Server error. Try again later.'
			});
		}

		throw redirect(303, '/admin');
	},

	insert: async (event) => {
		const { request } = event;
		/**
		 * Protect the route with a session check
		 */
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw svelteError(403, 'Not authorized');
		}
		const data = await request.formData();
		const slug = data.get('name')?.toString().toLowerCase().replace(/ /g, '-');
		const name = data.get('name')?.toString();
		const url = data.get('url')?.toString();

		if (!slug || !name || !url) throw new Error('Missing data');

		const { error: insertToolError, status } = await supabaseClient
			.from('tools')
			.insert({ name, slug, url });

		if (insertToolError) {
			throw new Error(insertToolError.message);
		}
		if (status === 201) {
			throw redirect(303, `/tools/${slug}`);
		}
	}
};
