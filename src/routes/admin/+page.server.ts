import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { airtable } from '../../utils/airtable';
import { openai } from '../../utils/openai';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const url = data.get('url');

		// 1. Get metadata from OpenAI
		const prompt = `
    Given this JSON structure: { "site": { "title": "", "description": "", "tags": [""] }}
    And for this website: ${url}
    Provide a JSON with the site's title, a brief description of what the tool does (no more than 256 characters long) and 5 hashtags that don't include the title
    `;

		const response = await openai.post('', {
			model: 'text-davinci-003',
			prompt,
			max_tokens: 1000
		});

		const [result] = response.data?.choices ?? [];
		const tool = result?.text ? JSON.parse(result.text) : null;

		// 2. Add entry to airtable
		const airtableResponse = await airtable.post(
			`/${env.AIRTABLE_BASE_ID}/${env.AIRTABLE_BASE_NAME}`,
			{
				records: [
					{
						fields: {
							URL: url,
							Title: tool.site.title,
							Description: tool.site.description,
							Tags: tool.site.tags.join(' | ')
						}
					}
				]
			}
		);
		console.log(airtableResponse);

		// 3. Redirect to home
		throw redirect(303, '/');
	}
} satisfies Actions;
