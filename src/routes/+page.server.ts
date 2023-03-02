import { supabase } from '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error as svelteError } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
	const { data: tools, error } = await supabase.from('tools').select('*');
	if (error) throw svelteError(500, { ...error });
	return {
		tools,
	};
}) satisfies PageServerLoad;

export const actions = {
	submitTool: async (event) => {
		const { request } = event;

		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();

		const url = formData.get('url') as string;
		const email = formData.get('email') as string;

		const { error, status } = await supabaseClient
			.from('submitted_tools')
			.insert({ url, user_email: email });

		if (error) throw svelteError(500, { ...error });
		if (status === 201) return { success: true };

		return { success: false };
	},
} satisfies Actions;
