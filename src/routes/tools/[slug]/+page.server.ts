import { supabase } from '$lib/db';
import { error as svelteError } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
	const { data, error } = await supabase.from('tools').select('*').eq('slug', params.slug);

	if (error || !data) {
		throw svelteError(404, { message: 'Not found' });
	}

	const [tool] = data;

	return {
		tool
	};
}
