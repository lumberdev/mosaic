import { supabase } from '$lib/supabase';
import { sanitizeString } from '../../../utils/sanitize-string';
import type { RequestHandler } from './$types';
import { json, error as svelteError } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

import playwright from 'playwright-aws-lambda';

const storageUrl = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/tools-images/`;

export const GET: RequestHandler = async ({ url }) => {
	const toolUrl = url.searchParams.get('url');
	const toolName = url.searchParams.get('name');

	if (!toolUrl) throw svelteError(422, 'Missing tool url');

	const fileName = toolName
		? `${sanitizeString(toolName, '_')}.png`
		: `${sanitizeString(toolUrl)}.png`;

	const browser = await playwright.launchChromium();
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto(toolUrl);
	const buffer = await page.screenshot();
	await browser.close();

	const { data, error } = await supabase.storage.from('tools-images').upload(fileName, buffer, {
		contentType: 'image/png',
	});
	if (error) throw svelteError(500, { ...error });
	if (data?.path) return json({ imageUrl: `${storageUrl}${data.path}`, path: data.path });

	return new Response('Upload failed', { status: 500 });
};
