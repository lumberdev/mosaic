import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';
import { airtable } from '../../../utils/airtable';
import { openai } from '../../../utils/openai';
import readibility from '../../../utils/readibility';

export const GET = async () => {
	try {
		const { status, data } = await airtable.post(`/${env.AIRTABLE_BASE_ID}/${encodeURI(env.AIRTABLE_BASE_NAME)}/listRecords`, {});

		if (status !== 200) throw error(500, { message: 'Something went wrong.' });

		const entries: { url: string; title: string; summary: string; categories: string }[] = [];
		for (const entry of data.records) {
			const url = entry?.fields.URL ?? '';

			const content = await readibility({ url });

			const response = await openai.post('', {
				model: 'text-davinci-002',
				prompt: [
					`In 180 characters, summarize the purpose of this website for non-tech savvy users: ${url}`,
					`Provide 5 social media friendly categories under which ${url} could be classified as.`
				],
				max_tokens: 256
			});

			const [summary, categories] = response.data?.choices ?? [];

			entries.push({
				url,
				title: content?.title ?? '',
				summary: summary.text,
				categories: categories.text
			});
		}

		return json(entries);
	} catch (error) {
		return json(error);
	}
};
