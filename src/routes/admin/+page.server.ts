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
			throw svelteError(error.status ?? 500, error.message);
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

		if (!email || !password) throw svelteError(400, 'Missing data');

		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return svelteError(400, {
					message: 'Invalid credentials.',
				});
			}
			return svelteError(500, {
				message: 'Server error. Try again later.',
			});
		}

		throw redirect(303, '/admin');
	},

	signOut: async (event) => {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();
		throw redirect(303, '/');
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
		const slug = data.get('name')?.toString().toLowerCase().replace(/\s/g, '-');
		const name = data.get('name')?.toString();
		const url = data.get('url')?.toString();
		const description = data.get('description')?.toString();
		const tags = data.get('tags')?.toString().split(', ');
		const image = data.get('image') as File;
		let imagePath = '';

		if (!slug || !name || !url) throw new Error('Missing data');

		if (image) {
			const { data, error } = await supabaseClient.storage
				.from('tools-images')
				.upload(image.name, image);

			if (data?.path) imagePath = data.path;
		}

		const { error: insertToolError, status } = await supabaseClient
			.from('tools')
			.insert({ name, slug, url, description, tags, featured_image: imagePath });

		if (insertToolError) {
			throw svelteError(422, insertToolError.message);
		}

		if (status === 201) {
			throw redirect(303, `/tools/${slug}`);
		}
	},
};
