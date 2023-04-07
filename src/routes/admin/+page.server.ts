import { redirect, error as svelteError } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { toSlug } from '../../utils/to-slug';
import { createEntry } from '$lib/contentful';

export const actions: Actions = {
	signIn: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);

		const data = await request.formData();

		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) throw svelteError(400, 'Missing data');

		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				throw svelteError(400, {
					message: 'Invalid credentials.',
				});
			}
			throw svelteError(500, {
				message: 'Server error. Try again later.',
			});
		}

		throw redirect(303, '/admin');
	},

	signOut: async (event) => {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();
		throw redirect(303, '/');
	},

	insert: async (event) => {
		const { request } = event;
		/**
		 * Protect the route with a session check
		 */
		const { session, supabaseClient } = await getSupabase(event);

		if (!session) throw svelteError(403, 'Not authorized');

		const data = await request.formData();
		const name = data.get('name') as string;
		const slug = toSlug(name);
		const url = data.get('url') as string;
		const description = data.get('description') as string;
		const tags = data.get('tags')?.toString().split(', ');
		const uploadImage = data.get('uploadImage')?.toString();
		const imageId = data.get('imageId')?.toString();
		const image = data.get('image') as File;

		let imagePath = '';
		let id = '';
		if (!slug || !name || !url) throw svelteError(400, 'Missing data');

		if (uploadImage === 'true') {
			if (image) {
				const { data } = await supabaseClient.storage
					.from('tools-images')
					.upload(image.name, image);

				if (data?.path) imagePath = data.path;
			}
		} else if (uploadImage === 'false') {
			if (imageId) id = imageId;
		}
		let entry = null;
		try {
			entry = await createEntry('tool', {
				name: {
					'en-US': name,
				},
				slug: {
					'en-US': slug,
				},
				url: {
					'en-US': url,
				},
				description: {
					'en-US': description,
				},
				tags: {
					'en-US': tags,
				},
				featuredImage: {
					'en-US': {
						sys: {
							type: 'Link',
							linkType: 'Asset',
							id,
						},
					},
				},
			});
		} catch (error) {
			console.log(error);
			throw svelteError(422, { message: 'Error creating entry' });
		}
		console.log(entry);
		if (entry) throw redirect(303, `/tools/${slug}`);
	},
};
