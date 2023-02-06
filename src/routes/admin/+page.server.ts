import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { Actions } from './$types';

export const actions = {
	signUp: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) throw new Error('Missing data');

		const { error, data: user } = await supabase.auth.signUp({ email, password });

		if (error) {
			throw new Error(error.message);
		}
		if (user) {
			console.log(user);
			throw redirect(303, '/admin');
		}
	},
	signIn: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();
		if (!email || !password) throw new Error('Missing data');

		const { error, data: user } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			throw new Error(error.message);
		}
		if (user) {
			console.log(user);
			throw redirect(303, '/admin');
		}
	},
	insert: async ({ request }) => {
		const data = await request.formData();
		const slug = data.get('name')?.toString().toLowerCase().replace(/ /g, '-');
		const name = data.get('name')?.toString();
		const url = data.get('url')?.toString();

		if (!slug || !name || !url) throw new Error('Missing data');

		const { error, status } = await supabase.from('tools').insert({ name, slug, url });

		if (error) {
			throw new Error(error.message);
		}
		if (status === 201) {
			throw redirect(303, `/tools/${slug}`);
		}
	}
} satisfies Actions;
