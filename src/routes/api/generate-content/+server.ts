import { error, json } from '@sveltejs/kit';
import { openai } from '$lib/utils/openai';
import readability from '$lib/utils/readability';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (req) => {
	const url = req.url.searchParams.get('url');
	const generationMethod = req.url.searchParams.get('generationMethod');

	if (!url) throw error(400, 'Missing url param.');

	// Scrap website content
	const site =
		generationMethod !== 'url'
			? await readability({ url, useCache: generationMethod === 'cached-content' ? true : false })
			: null;

	const prompt =
		generationMethod === 'url'
			? `Given this JSON structure:\n{ "name": "", "summary": "", "tags": [] }\nProvide a JSON object with the name, 5 catchy tags and a brief summary of this website: ${url}`
			: `Given this JSON structure:\n{ "name": "", "summary": "", "tags": [] }\nProvide a JSON object with the name, 5 catchy tags and a brief summary of this:\n${site?.textContent}`;

	// Get content from OpenAI
	try {
		const response = await openai.post('', {
			model: 'text-davinci-003',
			prompt,
			max_tokens: 500,
		});

		const [completion] = response.data.choices ?? [];
		const data = completion?.text
			? JSON.parse(String(completion.text).trim().replace(/\n/g, ''))
			: null;

		return json(data);
	} catch (error) {
		console.error(error);
		return json({});
	}
};
