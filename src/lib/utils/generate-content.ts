import { DANGEROUSLY_PUBLIC_openai } from './public-openai';
import { toSlug } from './to-slug';
import type {
	GenerateContentResponse,
	MetaDescriptionResponse,
	ReadabilityResponse,
} from '../types';
import type { Asset } from 'contentful-management';

export const generateAIContentClientSide = async ({
	url,
	siteContent,
	siteTitle,
}: {
	url: string;
	siteContent: string;
	siteTitle: string;
}): Promise<GenerateContentResponse> => {
	let isLoading = true;

	const prompt = `
			Answer with the following JSON format: 
			{
      "summary": "<string>",
      "tags": "<[]>"
      }
		
			Make a summary between 150 and 200 words of the pupose of the tool described by the following text and give it 3 to 5 tags:
			${siteContent}

			
			{ "summary":
			`;
	let openAiResponse = null;
	try {
		openAiResponse = await DANGEROUSLY_PUBLIC_openai.post('', {
			model: 'text-davinci-003',
			prompt,
			max_tokens: 500,
			temperature: 0.7,
		});
	} catch (error) {
		console.error(error);
	}
	const [completion] = openAiResponse?.data?.choices ?? [];
	const data = completion?.text
		? JSON.parse(
				String('{ "summary":' + completion.text)
					.trim()
					.replace(/\n/g, '')
		  )
		: null;

	const name = siteTitle;
	const tags = data?.tags?.join(', ') || '';
	const description = data?.summary || '';
	const { imageId, imageUrl } = await generateImage({ url, name });

	isLoading = false;
	return {
		data: {
			name,
			tags,
			url,
			slug: toSlug(name),
			description,
			imageId,
			imageUrl,
		},
		isLoading,
	};
};

export const generateImage = async ({ url, name }: { url: string; name: string }) => {
	let isLoading = true;
	const params = new URLSearchParams();
	params.set('url', url);
	params.set('name', name);
	let imageFromContentful = {} as { asset: Asset };
	try {
		const response = await fetch(`/api/take-screenshot?${params.toString()}`);
		imageFromContentful = await response.json();
	} catch (err) {
		console.error(err);
	}

	const imageId = imageFromContentful?.asset?.sys?.id ?? '';
	const imageUrl = imageFromContentful?.asset?.fields?.file['en-US'].url ?? '';
	isLoading = false;
	return {
		imageId,
		imageUrl,
		isLoading,
	};
};

export const getReadability = async ({
	url,
	generationMethod,
}: {
	url: string;
	generationMethod: string;
}): Promise<ReadabilityResponse> => {
	const params = new URLSearchParams();
	params.set('url', url);
	params.set('useCache', String(generationMethod === 'cached-content'));

	let site = {} as ReadabilityResponse;
	try {
		const response = await fetch(`/api/readability?${params.toString()}`);
		site = (await response.json()) ?? {};
	} catch (error) {
		console.error('error while fetching readbility', error);
	}
	return { ...site, url };
};

export const getMetaDescription = async ({
	url,
}: {
	url: string;
}): Promise<MetaDescriptionResponse> => {
	const params = new URLSearchParams();
	params.set('url', url);

	let description = {} as MetaDescriptionResponse;
	try {
		const response = await fetch(`/api/meta-description?${params.toString()}`);
		description = (await response.json()) ?? {};
	} catch (error) {
		console.error('error while fetching meta description', error);
	}
	return { ...description, url };
};
