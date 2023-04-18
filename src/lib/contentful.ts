import {
	CONTENTFUL_SPACE_ID,
	CONTENTFUL_ACCESS_TOKEN,
	CONTENTFUL_MANAGEMENT_TOKEN,
} from '$env/static/private';
import mgmt from 'contentful-management';
import type { ContentfulEntryArgs } from './types';

export async function contentfulFetch(query: string) {
	const url = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
		},
		body: JSON.stringify({ query }),
	});

	return response;
}

export const contentfulClient = mgmt.createClient({
	accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
	space: CONTENTFUL_SPACE_ID,
});

export async function createEntry(contentType: string, fields: Record<string, unknown>) {
	const space = await contentfulClient.getSpace(CONTENTFUL_SPACE_ID);
	const environment = await space.getEnvironment('master');
	const entry = await environment.createEntry(contentType, { fields });
	return entry;
}

export async function uploadImage(buffer: Buffer, fileName: string) {
	const space = await contentfulClient.getSpace(CONTENTFUL_SPACE_ID);
	const environment = await space.getEnvironment('master');

	let createdAsset = null;
	let processedAsset = null;
	let publishedAsset = null;
	try {
		createdAsset = await environment.createAssetFromFiles({
			fields: {
				title: {
					'en-US': fileName,
				},
				description: {
					'en-US': `Screenshot of ${fileName.replace('.png', '')}`,
				},
				file: {
					'en-US': {
						fileName,
						contentType: 'image/png',
						file: buffer,
					},
				},
			},
		});
		try {
			processedAsset = await createdAsset.processForAllLocales();
		} catch (error) {
			console.error('error while processing: ', error);
		}
		try {
			publishedAsset = await processedAsset?.publish();
		} catch (error) {
			console.error('error while publishing: ', error);
		}
	} catch (error) {
		console.error('eror while uploading: ', error);
	}
	return publishedAsset;
}

export const serializeEntry = (obj: ContentfulEntryArgs) => {
	const locale = 'en-US';
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (key === 'imageId') {
			return {
				...acc,
				featuredImage: {
					[locale]: {
						sys: {
							type: 'Link',
							linkType: 'Asset',
							id: value,
						},
					},
				},
			};
		}
		if (key === 'imageUrl') {
			return acc;
		}
		if (key === 'tags') {
			return {
				...acc,
				tags: {
					[locale]: value.split(', '),
				},
			};
		}
		return {
			...acc,
			[key]: {
				[locale]: value,
			},
		};
	}, {});
};
