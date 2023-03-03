import { redirect, error as svelteError } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
	setPassword: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();
		const password1 = formData.get('password1') as string;
		const password2 = formData.get('password2') as string;

		// Already checked in the client but just in case
		if (!password1 !== !password2) throw svelteError(500, 'Passwords do not match');
		const password = password1;
		const { data, error } = await supabaseClient.auth.updateUser({
			password,
		});
		if (error) throw svelteError(error.status ?? 500, error.message);
		if (data) throw redirect(303, '/admin');
	},
};
