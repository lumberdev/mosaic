import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import axios from 'axios';

const userAgent =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36';
const googleWebcachePrefix = 'https://webcache.googleusercontent.com/search?q=cache:';

const getCachedHTML = (url: string) => {
	return axios({
		method: 'get',
		url: googleWebcachePrefix + url,
		headers: { 'User-Agent': userAgent },
	})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error('error while fetching cahed html', error?.response);
			if (error.request.res.statusCode >= 400 && error.request.res.statusCode < 500) {
				return getHTML(url);
			}
		});
};

const getHTML = (url: string) => {
	return axios({
		method: 'get',
		url: url,
		headers: { 'User-Agent': userAgent },
	})
		.then((res) => {
			if (res.status == 200) {
				return res.data;
			}
		})
		.catch((error) => {
			console.error('error while fetching html', error?.response);
		});
};

export default async (args: { url: string; html?: string; useCache?: boolean }) => {
	const url = args.url;
	const html = args.html || args.useCache === false ? await getHTML(url) : await getCachedHTML(url);
	if (html) {
		const doc = new JSDOM(html, { url });
		const reader = new Readability(doc.window.document);
		const article = reader.parse();
		return { ...article, html };
	}
};
