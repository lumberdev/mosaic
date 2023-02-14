import { error, json } from '@sveltejs/kit';
import readability from '../../../utils/readability';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (req) => {
	const url = req.url.searchParams.get('url');
	const useCache = req.url.searchParams.get('useCache');

	if (!url) throw error(400, 'Missing url param.');

	const site = await readability({ url, useCache: useCache === 'false' ? false : true });

	return json(site);
};
