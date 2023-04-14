import type { Database } from './supabase';

export type Tool = Database['public']['Tables']['tools']['Row'];

export interface ReadabilityResponse {
	title: string;
	byline: string | null;
	dir: string | null;
	lang: string | null;
	content: string;
	textContent: string;
	length: number;
	excerpt: string;
	siteName: string | null;
	html: string;
	url: string;
}

export interface MetaDescriptionResponse {
	description: string;
	url: string;
}

export interface AllSiteReadabilityAndMetaDescription {
	readability: ReadabilityResponse;
	metaDescription: MetaDescriptionResponse;
}

export interface GenerateContentResponse {
	data: {
		name: string;
		tags: string[];
		url: string;
		slug: string;
		description: string;
		imageId: string;
		imageUrl: string;
	};
	isLoading: boolean;
}

export interface ContentfulEntryArgs {
	name: string;
	tags: string[];
	url: string;
	slug: string;
	description: string;
	imageId: string;
	imageUrl: string;
}
