import { redirect, error as svelteError } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
	setPassword: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();
		const password = formData.get('password') as string;

		if (!password) throw svelteError(400, 'Missing data');

		const { data, error } = await supabaseClient.auth.updateUser({
			password,
		});
		if (error) throw svelteError(error.status ?? 500, error.message);
		if (data) throw redirect(303, '/admin');
	},
};
