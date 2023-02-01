import { env } from '$env/dynamic/private';
import { airtable } from '../utils/airtable';

export const load = async () => {
	const { status, data } = await airtable.post(
		`/${env.AIRTABLE_BASE_ID}/${encodeURI(env.AIRTABLE_BASE_NAME)}/listRecords`,
		{}
	);

	if (status !== 200) return { tools: [] };

	const tools = data.records.map((record) => ({
		url: record.fields.URL,
		title: record.fields.Title,
		description: record.fields.Description,
		tags: record.fields.Tags.split(' | ')
	}));

	return {
		tools
	};
};
