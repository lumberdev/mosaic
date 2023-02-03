import { supabase } from '$lib/db';

export async function load() {
	const { data, error } = await supabase.from('tools').select('*');
	if (!error) return;
	return {
		data
	};
}
