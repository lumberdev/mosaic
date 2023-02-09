import { supabase } from '$lib/supabase';
import { error as svelteError } from '@sveltejs/kit';

export const load = async () => {
	const { data: tools, error } = await supabase.from('tools').select('*');
	if (error) throw svelteError(500, { ...error });

	return {
		tools
	};
};
