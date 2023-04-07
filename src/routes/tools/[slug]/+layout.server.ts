import { contentfulFetch } from '$lib/contentful';
import { error as svelteError } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
	const query = `
	{
		toolCollection(where: { slug: "${params.slug}" }) {
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
	`;

	const response = await contentfulFetch(query);

	if (!response.ok) throw svelteError(404, { message: response.statusText });

	const { data } = await response.json();
	const tool = data.toolCollection.items[0] ?? null;

	return {
		tool,
	};
}
