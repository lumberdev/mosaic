import { fail, redirect, error as svelteError } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { toSlug } from '../../utils/to-slug';
import { createEntry, serializeEntry } from '$lib/contentful';
import { generateContentClientSide } from '$lib/generate-content';

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

	batchContent: async (event) => {
		const { session } = await getSupabase(event);
		if (!session) throw svelteError(403, 'Not authorized');
		const { request } = event;

		const data = await request.formData();
		const urlsString = data.get('urls') as string;
		const urls = urlsString
			.split(',')
			.map((url) => url.trim())
			.filter(Boolean);
		const generationMethod = data.get('generationMethod') as string;

		if (urls?.length === 0)
			fail(400, { message: "Missing data, make sure there's at least one URL", success: false });

		let allContentPromisesResolved = [];
		try {
			allContentPromisesResolved = await Promise.all(
				urls.map((url) => generateContentClientSide({ url, generationMethod, event }))
			);
		} catch (error) {
			console.error(error);
			throw svelteError(500, 'Server error while generating content. Try again later.');
		}

		let allContentfulEntryPromisesResolved = [];
		try {
			allContentfulEntryPromisesResolved = await Promise.all(
				allContentPromisesResolved.map((contentResponse) => {
					const contentfulObject = serializeEntry(contentResponse.data);
					return createEntry('tool', contentfulObject);
				})
			);
		} catch (error) {
			console.error(error);
			throw svelteError(500, 'Server error while uploading content. Try again later.');
		}

		return {
			status: 201,
			success: true,
			body: {
				data: allContentfulEntryPromisesResolved.map((entry) => entry.toPlainObject()),
			},
		};
	},

	insert: async (event) => {
		const { request } = event;
		/**
		 * Protect the route with a session check
		 */
		const { session } = await getSupabase(event);

		if (!session) throw svelteError(403, 'Not authorized');

		const data = await request.formData();
		const name = data.get('name') as string;
		const slug = toSlug(name);
		const url = data.get('url') as string;
		const description = data.get('description') as string;
		const tags = data.get('tags')?.toString().split(', ');
		const imageId = data.get('imageId') as string;

		if (!slug || !name || !url) throw svelteError(400, 'Missing data');

		let entry = null;
		const locale = 'en-US';
		try {
			entry = await createEntry('tool', {
				name: {
					[locale]: name,
				},
				slug: {
					[locale]: slug,
				},
				url: {
					[locale]: url,
				},
				description: {
					[locale]: description,
				},
				tags: {
					[locale]: tags,
				},
				featuredImage: {
					[locale]: {
						sys: {
							type: 'Link',
							linkType: 'Asset',
							id: imageId,
						},
					},
				},
			});
		} catch (error) {
			console.log(error);
			throw svelteError(422, { message: 'Error creating entry' });
		}
		if (entry) return { success: true };
	},
};
