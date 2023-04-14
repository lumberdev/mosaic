import { DANGEROUSLY_PUBLIC_openai } from '../utils/public-openai';
import { toSlug } from '../utils/to-slug';
import type { MetaDescriptionResponse, ReadabilityResponse } from '../types';

export interface GenerateContentResponse {
	data: {
		name: string;
		tags: string[];
		url: string;
		slug: string;
		description: string;
		imageId: string;
		imageUrl: string;
	};
	isLoading: boolean;
}

export const generateContentClientSide = async ({
	url,
	siteContent,
}: {
	url: string;
	siteContent: string;
}): Promise<GenerateContentResponse> => {
	let isLoading = true;

	const prompt = `
			${siteContent}

			a summary of the purpose of the tool described by the website above as a JSON object that looks like this
      "{
      "name": "Name of tool",
      "summary": "string",
      "tags": "[Array of 5 tags describing the purpose of the tool]"
      }":
			
			{
			
			`;

	const openAiResponse = await DANGEROUSLY_PUBLIC_openai.post('', {
		model: 'text-davinci-003',
		prompt,
		max_tokens: 500,
		temperature: 0.7,
	});
	console.log('openAiResponse', openAiResponse);
	const [completion] = openAiResponse.data.choices ?? [];
	const data = completion?.text
		? JSON.parse(
				String('{' + completion.text)
					.trim()
					.replace(/\n/g, '')
		  )
		: null;

	const name = data?.name || '';
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
	const response = await fetch(`/api/take-screenshot?${params.toString()}`);
	const completion = await response.json();

	const imageId = completion?.asset.sys.id ?? '';
	const imageUrl = completion?.asset.fields.file['en-US'].url ?? '';
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
	const response = await fetch(`/api/readability?${params.toString()}`);
	const site = await response.json();
	return { ...site, url };
};

export const getMetaDescription = async ({
	url,
}: {
	url: string;
}): Promise<MetaDescriptionResponse> => {
	const params = new URLSearchParams();
	params.set('url', url);
	const response = await fetch(`/api/meta-description?${params.toString()}`);
	const description = await response.json();
	return { ...description, url };
};
