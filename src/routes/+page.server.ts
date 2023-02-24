import { supabase } from '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error as svelteError, type Actions } from '@sveltejs/kit';

export const load = async () => {
	const { data: tools, error } = await supabase.from('tools').select('*');
	if (error) throw svelteError(500, { ...error });

	return {
		tools,
	};
};

export const actions: Actions = {
	submitTool: async (event) => {
		const { request } = event;

		const { supabaseClient } = await getSupabase(event);

		const data = await request.formData();

		const url = data.get('url') as string;
		const email = data.get('email') as string;

		const {
			error,
			status,
			data: res,
		} = await supabaseClient.from('submitted_tools').insert({ url, user_email: email });
		console.log(error, status, res);
	},
};
