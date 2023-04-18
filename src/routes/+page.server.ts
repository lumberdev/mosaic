import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error as svelteError } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { contentfulFetch } from '$lib/contentful';

const query = `
{
  toolGalleryCollection(where: { slug: "main" }, limit: 1) {
    items {
      name
      slug
      toolsCollection {
        items {
          name
          slug
          url
          description
          tags
          featuredImage {
            title
            description
            url
          }
        }
      }
    }
  }
}
`;

export const load = (async () => {
	let response: Response;
	try {
		response = await contentfulFetch(query);
	} catch (error) {
		console.error(error);
		throw svelteError(404, "Couldn't fetch tools");
	}

	const { data } = (await response?.json()) ?? {};
	const tools = data.toolGalleryCollection.items[0].toolsCollection.items ?? [];
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
