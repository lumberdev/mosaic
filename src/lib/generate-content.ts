import type { RequestEvent } from '../routes/admin/$types';
import { DANGEROUSLY_PUBLIC_openai } from '../utils/public-openai';
import { parse } from 'node-html-parser';
import { toSlug } from '../utils/to-slug';

export const generateContentClientSide = async ({
	url,
	generationMethod,
	event,
}: {
	url: string;
	generationMethod: string;
	event: RequestEvent;
}) => {
	let isLoading = true;
	const error = null;

	const params = new URLSearchParams();
	params.set('url', url);
	params.set('useCache', String(generationMethod === 'cached-content'));
	const { fetch } = event;
	const site =
		generationMethod !== 'url'
			? await (await fetch(`/api/readability?${params.toString()}`)).json()
			: null;

	const prompt = !site
		? `{${url}}

      a summary of the purpose of the tool described by the website above as a JSON object that looks like this
      "{
      "name": "Name of tool",
      "summary": "string",
      "tags": "[Array of 5 tags describing the purpose of the tool]"
      }":

      {`
		: generationMethod === 'meta'
		? `{${site?.textContent}}

      summary of the tool described by the text above as a JSON object that looks like this
      "{
      "name": "Name of tool",
      "tags": "[Array of 5 tags describing the purpose of the tool]"
      }":

      {`
		: `{${site?.textContent}}

      a summary of the purpose of the tool described by the text above as a JSON object that looks like this
      "{
      "name": "Name of tool",
      "summary": "string",
      "tags": "[Array of 5 tags describing the purpose of the tool]"
      }":

      {`;

	const openAiResponse = await DANGEROUSLY_PUBLIC_openai.post('', {
		model: 'text-davinci-003',
		prompt,
		max_tokens: 500,
		temperature: 0.7,
	});
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
	let description = '';
	if (generationMethod !== 'meta') {
		description = data?.summary || '';
	} else {
		const root = parse(site.html);
		const descriptionMeta = root.querySelector('head meta[name="description"]');
		description = descriptionMeta?.getAttribute('content') ?? '';
	}

	const { imageId, imageUrl } = await generateImage({ url, name, event });
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
		error,
	};
};

export const generateImage = async ({
	url,
	name,
	event,
}: {
	url: string;
	name: string;
	event: RequestEvent;
}) => {
	let isLoading = true;
	const params = new URLSearchParams();
	params.set('url', url);
	params.set('name', name);
	const { fetch } = event;
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
