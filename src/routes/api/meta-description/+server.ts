import type { RequestHandler } from './$types';
import { json, error as svelteError } from '@sveltejs/kit';
import { parse } from 'node-html-parser';

export const GET: RequestHandler = async (req) => {
	const url = req.url.searchParams.get('url');
	if (!url) throw svelteError(400, 'No URL provided');

	const response = await fetch(url);
	const site = await response.text();
	const root = parse(site);
	const descriptionMeta = root.querySelector('head meta[name="description"]');
	const description = descriptionMeta?.getAttribute('content') ?? '';
	const title = root.querySelector('head title')?.text ?? '';
	return json({ description, title });
};
