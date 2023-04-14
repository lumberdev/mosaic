<script lang="ts">
	import { error as svelteError } from '@sveltejs/kit';
	import type { Entry } from 'contentful-management';
	import { getReadability, getMetaDescription } from '$lib/utils/generate-content';
	import type {
		AllSiteReadabilityAndMetaDescription,
		GenerateContentResponse,
		MetaDescriptionResponse,
		ReadabilityResponse,
	} from '$lib/types';
	import BatchResults from './BatchResults.svelte';

	let generationMethod = 'cached-content';
	let urls = '';
	let isLoading = false;
	let isSiteContentLoading = false;
	let allSiteReadbilityAndMetaDescriptions: AllSiteReadabilityAndMetaDescription[] = [];
	let allAiContent: GenerateContentResponse[] | null = null;
	let allContentfulEntries: Entry[] = [];
	let isContentfulEntriesLoading = false;

	async function handleSiteContentClick(): Promise<void> {
		const urlsArray = urls
			.split(',')
			.map((url) => url?.trim())
			.filter(Boolean);

		isSiteContentLoading = true;

		try {
			// Get all the content from the URLs, both from Readability and Meta Description
			const allResponses: PromiseSettledResult<
				PromiseSettledResult<ReadabilityResponse | MetaDescriptionResponse>[]
			>[] = await Promise.allSettled(
				urlsArray.map(
					async (url) =>
						await Promise.allSettled([
							getReadability({ url, generationMethod }),
							getMetaDescription({ url }),
						])
				)
			);
			// filter the responses to only get the ones that were fulfilled
			const allFulfilledPromises = allResponses.filter(
				(result) =>
					result.status === 'fulfilled' &&
					result.value.filter((result) => result.status === 'fulfilled')
			) as PromiseFulfilledResult<
				PromiseFulfilledResult<ReadabilityResponse | MetaDescriptionResponse>[]
			>[];
			// reorganize nested array of responses into a single array of objects
			allSiteReadbilityAndMetaDescriptions = allFulfilledPromises.map((result) =>
				result.value.reduce(
					(
						acc,
						item: PromiseFulfilledResult<ReadabilityResponse | MetaDescriptionResponse>,
						index
					) => {
						if (index === 0)
							return {
								...acc,
								readability: item.value as ReadabilityResponse,
							};
						if (index === 1)
							return {
								...acc,
								metaDescription: item.value as MetaDescriptionResponse,
							};
						return acc;
					},
					{} as AllSiteReadabilityAndMetaDescription
				)
			);
		} catch (error) {
			console.error(error);
			throw svelteError(500, 'Server error while fetching readability. Try again later.');
		}

		isSiteContentLoading = false;
	}

	$: {
		// assign a value to allAiContent once allSiteReadbilityAndMetaDescriptions is populated
		if (!allAiContent && allSiteReadbilityAndMetaDescriptions.length > 0) {
			allAiContent = Array(allSiteReadbilityAndMetaDescriptions.length).fill(null);
		}
	}

	$: {
		console.log('allReadability', allSiteReadbilityAndMetaDescriptions);
		console.log('allContentfulEntries', allContentfulEntries);
		console.log('allAiContent', allAiContent);
	}

	$: {
		// Upload to Contentful once all the content is generated
		if (allAiContent && allAiContent.filter(Boolean).length === allAiContent.length) {
			uploadToContentful(allAiContent);
		}
	}

	async function uploadToContentful(contentArray: GenerateContentResponse[]) {
		isContentfulEntriesLoading = true;
		try {
			const response = await fetch('/api/upload-to-contentful', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(contentArray),
			});
			allContentfulEntries = await response.json();
			if (response.ok) {
				urls = '';
				allSiteReadbilityAndMetaDescriptions = [];
			}
		} catch (error) {
			console.error(error);
			throw svelteError(500, 'Server error while uploading to Contentful. Try again later.');
		}
		isContentfulEntriesLoading = false;
	}
</script>

<form class="mx-auto flex w-max  flex-col items-center justify-center pt-8">
	<h1 class="mb-4 font-display text-5xl">Found a new cool AI tool?</h1>
	<p class="mb-8">Let's add it to Mosaic!</p>

	<div class="mb-8 w-max">
		<p class="mb-4 text-center font-display">How do you want to summarize this website?</p>

		<div class="grid w-full grid-cols-3 gap-2">
			<label class="rounded border-3 border-black bg-white px-5 py-4">
				<input
					type="radio"
					bind:group={generationMethod}
					name="method"
					value="cached-content"
					checked />
				<span>Cached Content</span>
			</label>

			<label class="rounded border-3 border-black bg-white px-5 py-4">
				<input type="radio" bind:group={generationMethod} name="method" value="content" />
				<span>Website's Content</span>
			</label>

			<label class="rounded border-3 border-black bg-white px-5 py-4">
				<input type="radio" bind:group={generationMethod} name="method" value="url" />
				<span>URL</span>
			</label>
		</div>
	</div>

	<label class="c-field w-full">
		<span class="c-field-label">List of URLs, comma separated</span>
		<textarea
			class="c-field-input"
			name="urls"
			bind:value={urls}
			placeholder="https://example1.com, https://example2.com"
			required />
	</label>

	<div class="mb-12 w-full">
		<button
			on:click={handleSiteContentClick}
			type="button"
			class="c-btn-submit w-full disabled:cursor-not-allowed disabled:opacity-20"
			disabled={isLoading}>
			Get Site Content (Readiblity + Meta Description)
		</button>
	</div>
</form>

{#if !isSiteContentLoading && allSiteReadbilityAndMetaDescriptions.length > 0}
	<div class="mx-auto flex flex-col items-center justify-center gap-8 pt-8">
		<h1 class="mb-4 font-display text-5xl">Site Content</h1>
		<p class="mb-8">Here is the content that was generated for each site</p>
		{#each allSiteReadbilityAndMetaDescriptions as { readability, metaDescription }, i}
			<BatchResults
				bind:allAiContent
				bind:allSiteReadbilityAndMetaDescriptions
				{i}
				{readability}
				{metaDescription} />
		{/each}
	</div>
{/if}

{#if !isContentfulEntriesLoading && allContentfulEntries.length > 0}
	<div class="mx-auto flex w-max  flex-col items-center justify-center pt-8">
		<h1 class="mb-4 font-display text-5xl">Contentful Entries</h1>
		<p class="mb-8">Here are the entries that were created in Contentful</p>
		<div class="grid w-full grid-cols-3 gap-2">
			{#each allContentfulEntries as entry}
				<div class="max-w-xs rounded border-3 border-black bg-white px-5 py-4">
					<h2 class="mb-4 text-lg font-bold">{entry.fields.name['en-US']}</h2>
					<p>{entry.fields.description['en-US']}</p>
					<p class="my-4 font-display">{entry.fields.url['en-US']}</p>
				</div>
			{/each}
		</div>
	</div>
{/if}
