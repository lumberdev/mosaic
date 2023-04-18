// import { Buffer } from 'buffer';
// import { createEntry, uploadImage } from '$lib/contentful';
// import { supabase } from '$lib/supabase';
// import type { RequestHandler } from './$types';
// import { json, error as svelteError } from '@sveltejs/kit';

// const supabaseBucket =
// 	'https://qgynrzoywcnqzqkulybg.supabase.co/storage/v1/object/public/tools-images/';

// // this most likely won't work in production due to function timeout
// export const GET: RequestHandler = async () => {
// 	// fetch all tools from supabase
// 	const { data, error } = await supabase.from('tools').select('*');
// 	if (error) throw svelteError(500, { ...error });
// 	if (!data) throw svelteError(404, { message: 'Not found' });
// 	// upload images to contentful
// 	for (const tool of data) {
// 		const supabaseUrl = supabaseBucket + tool.featured_image;
// 		try {
// 			const response = await fetch(supabaseUrl);
// 			const arrayBuffer = await response.arrayBuffer();
// 			const buffer = Buffer.from(arrayBuffer);
// 			const asset = await uploadImage(buffer, tool.name);
// 			tool.featuredImageId = asset?.sys.id;
// 		} catch (error) {
// 			console.error(`Error while uploading image for ${tool.name} `, error);
// 			throw svelteError(500, { message: `Image for ${tool.name} upload failed` });
// 		}
// 	}

// 	// tranform tools into contentful format
// 	const locale = 'en-US';
// 	const tools = data.map(({ name, slug, url, description, tags, featuredImageId }) => ({
// 		name: {
// 			[locale]: name,
// 		},
// 		slug: {
// 			[locale]: slug,
// 		},
// 		url: {
// 			[locale]: url,
// 		},
// 		description: {
// 			[locale]: description,
// 		},
// 		tags: {
// 			[locale]: tags,
// 		},
// 		featuredImage: {
// 			[locale]: {
// 				sys: {
// 					type: 'Link',
// 					linkType: 'Asset',
// 					id: featuredImageId,
// 				},
// 			},
// 		},
// 	}));

// 	// upload tools to contentful
// 	for (const tool of tools) {
// 		try {
// 			const entry = await createEntry('tool', tool);
// 			console.log('uploaded entry', entry);
// 		} catch (error) {
// 			console.error(`Error uploading entry for ${tool.name}`, error);
// 			throw svelteError(500, { message: `Entry for ${tool.name} upload failed` });
// 		}
// 	}

// 	return json(data);
// };
