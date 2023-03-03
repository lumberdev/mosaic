import { supabase } from '$lib/supabase';
import { sanitizeString } from '../../../utils/sanitize-string';
import type { RequestHandler } from './$types';
import { chromium } from '@playwright/test';
import { error as svelteError } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const toolUrl = url.searchParams.get('url');
	const toolName = url.searchParams.get('name');

	if (!toolUrl) throw new Error('Missing tool url');

	const fileName = toolName
		? `${sanitizeString(toolName, '_')}.png`
		: `${sanitizeString(toolUrl)}.png`;

	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto(toolUrl);
	const buffer = await page.screenshot();
	await browser.close();

	const { data, error } = await supabase.storage.from('tools-images').upload(fileName, buffer, {
		contentType: 'image/png',
	});
	if (error) throw svelteError(500, { ...error });
	if (data) {
		return new Response('Upload successful', { status: 201, headers: { Location: data.path } });
	}
	return new Response('Upload failed', { status: 500 });
};
