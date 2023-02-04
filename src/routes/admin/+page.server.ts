import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { supabase } from '$lib/db';

export const actions = {
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
