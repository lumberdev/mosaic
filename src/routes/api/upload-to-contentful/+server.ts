import { createEntry, serializeEntry } from '$lib/contentful';
import type { Entry } from 'contentful-management';
import type { RequestHandler } from './$types';
import { json, error as svelteError } from '@sveltejs/kit';
import type { GenerateContentResponse } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	const allContentPromisesResolved = await request.json();
	let allContentfulEntries: Entry[];
	try {
		const allContentfulEntryPromisesResolved: PromiseSettledResult<Entry>[] =
			await Promise.allSettled(
				allContentPromisesResolved.map((contentResponse: GenerateContentResponse) => {
					const contentfulObject = serializeEntry(contentResponse.data);
					return createEntry('tool', contentfulObject);
				})
			);
		const allContentfulEntriesFulfilled = allContentfulEntryPromisesResolved.filter(
			(promise) => promise.status === 'fulfilled'
		) as PromiseFulfilledResult<Entry>[];
		allContentfulEntries = allContentfulEntriesFulfilled.map((promise) => promise.value);
	} catch (error) {
		console.error(error);
		throw svelteError(500, 'Server error while uploading content. Try again later.');
	}
	return json(allContentfulEntries);
};
