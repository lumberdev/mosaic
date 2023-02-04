import { supabase } from '$lib/db';

export const load = async () => {
	const { status, data: tools, error } = await supabase.from('tools').select('*');
	if (error || status !== 200) return { tools: [] };

	return {
		tools
	};
};