import { sanitizeString } from '../../../utils/sanitize-string';
import type { RequestHandler } from './$types';
import { json, error as svelteError } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';

import { chromium } from '@playwright/test';
import playwright from 'playwright-aws-lambda';
import { uploadImage } from '$lib/contentful';

export const GET: RequestHandler = async ({ url }) => {
	const toolUrl = url.searchParams.get('url');
	const toolName = url.searchParams.get('name');

	if (!toolUrl) throw svelteError(422, 'Missing tool url');

	const fileName = toolName
		? `${sanitizeString(toolName, '_')}.png`
		: `${sanitizeString(toolUrl)}.png`;

	// Use playwright to take screenshot
	let browser = null;
	let buffer = null;
	try {
		if (NODE_ENV === 'development') {
			// in development, use playwright to launch chromium
			browser = await chromium.launch();
		} else {
			// in production, use playwright-aws-lambda to launch chromium
			browser = await playwright.launchChromium();
		}
		const context = await browser.newContext();
		const page = await context.newPage();
		await page.goto(toolUrl);
		buffer = await page.screenshot();
	} catch (error) {
		console.error(error);
		throw svelteError(500, 'Could not take screenshot.');
	}
	if (browser) await browser.close();

	// Upload image to Contentful
	let asset = null;
	try {
		asset = await uploadImage(buffer, fileName);
	} catch (error) {
		console.error(error);
		throw svelteError(500, { message: 'Upload failed' });
	}

	if (asset) {
		console.log('asset', asset.fields.file);
		return json({ asset });
	} else throw svelteError(500, { message: 'Upload failed' });
};
