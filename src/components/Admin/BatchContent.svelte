<script lang="ts">
	import { generateContentClientSide, type GenerateContentResponse } from '$lib/generate-content';
	import { error as svelteError } from '@sveltejs/kit';
	import type { Entry } from 'contentful-management';

	let generationMethod = 'cached-content';
	let urls = '';
	let isLoading = false;
	let allContentPromisesResolved: GenerateContentResponse[] = [];
	let allContentfulEntries: Entry[] = [];
	let isContentfulEntriesLoading = false;

	async function handleSubmit() {
		const urlsArray = urls
			.split(',')
			.map((url) => url.trim())
			.filter(Boolean);
		try {
			allContentPromisesResolved = await Promise.all(
				urlsArray.map((url) => generateContentClientSide({ url, generationMethod }))
			);
		} catch (error) {
			console.error(error);
			throw svelteError(500, 'Server error while generating content. Try again later.');
		}
	}

	$: {
		if (allContentPromisesResolved.length > 0) {
			uploadToContentful().then((data) => (allContentfulEntries = data));
		}
	}

	async function uploadToContentful() {
		isContentfulEntriesLoading = true;
		let data = [];
		try {
			const response = await fetch('/api/upload-to-contentful', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(allContentPromisesResolved),
			});
			data = await response.json();
		} catch (error) {
			console.error(error);
			throw svelteError(500, 'Server error while uploading to Contentful. Try again later.');
		}
		isContentfulEntriesLoading = false;
		return data;
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
				<input type="radio" bind:group={generationMethod} name="method" value="meta" />
				<span>Website Meta Tag</span>
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
			on:click={handleSubmit}
			type="button"
			class="c-btn-submit w-full disabled:cursor-not-allowed disabled:opacity-20"
			disabled={isLoading}>
			Generate content
		</button>
	</div>
</form>
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
