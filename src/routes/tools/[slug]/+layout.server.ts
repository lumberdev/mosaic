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
	let response: Response;
	try {
		response = await contentfulFetch(query);
	} catch (error) {
		console.error(error);
		throw svelteError(404, `Couldn't fetch tool ${params.slug}`);
	}

	const { data } = (await response?.json()) ?? {};
	const tool = data.toolCollection.items[0] ?? null;

	return {
		tool,
	};
}
