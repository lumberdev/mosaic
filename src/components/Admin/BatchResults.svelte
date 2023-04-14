<script lang="ts">
	import type {
		AllSiteReadabilityAndMetaDescription,
		GenerateContentResponse,
		HandleGenerateContentClick,
		MetaDescriptionResponse,
		ReadabilityResponse,
	} from '$lib/types';
	import { generateAIContentClientSide } from '$lib/utils/generate-content';
	import Loader from '../SVG/Loader.svelte';

	export let readability: ReadabilityResponse;
	export let metaDescription: MetaDescriptionResponse;
	export let allAiContent: GenerateContentResponse[] | null;
	export let i: number;
	export let allSiteReadbilityAndMetaDescriptions: AllSiteReadabilityAndMetaDescription[];

	let isReadabilityLoading = false;
	let isMetaDescriptionLoading = false;

	const handleGenerateContentClick: HandleGenerateContentClick = async ({
		url,
		siteContent,
		siteTitle,
		index,
		isReadability,
	}) => {
		isReadability ? (isReadabilityLoading = true) : (isMetaDescriptionLoading = true);
		if (allAiContent) {
			allAiContent[index] = await generateAIContentClientSide({
				url,
				siteContent,
				siteTitle,
			});
		}
		isReadability ? (isReadabilityLoading = true) : (isMetaDescriptionLoading = true);
	};

	const handleDelete = () => {
		allSiteReadbilityAndMetaDescriptions = allSiteReadbilityAndMetaDescriptions.filter(
			(_, index) => index !== i
		);
	};
</script>

<section class="grid grid-cols-2 gap-2">
	<div class="col-span-2 flex items-center gap-4 justify-self-center">
		<h2 class="font-display">
			{readability.url}
		</h2>
		<button
			class="rounded border-2 border-black bg-white px-2 py-1 font-display text-sm shadow-sm hover:shadow-md"
			on:click={handleDelete}>Delete</button>
	</div>
	<div
		class={`relative rounded border-3 border-black bg-white px-5 py-4 ${
			allAiContent && allAiContent[i] ? 'opacity-20' : ''
		}`}>
		<h2 class="mb-4 text-center text-lg font-bold">Readability</h2>
		{#if isReadabilityLoading}<Loader className="absolute top-4 right-5 animate-spin" />{/if}
		<button
			class="c-btn-submit my-6 w-full disabled:cursor-not-allowed disabled:opacity-20"
			on:click={() =>
				handleGenerateContentClick({
					url: readability.url,
					siteContent: readability.textContent,
					siteTitle: readability.title,
					index: i,
					isReadability: true,
				})}>Generate AI Content with Readability</button>
		<p>{readability.textContent}</p>
	</div>

	<div
		class={`relative rounded border-3 border-black bg-white px-5 py-4 ${
			allAiContent && allAiContent[i] ? 'opacity-20' : ''
		}`}>
		<h2 class="mb-4 text-center text-lg font-bold">Meta Description</h2>
		{#if isMetaDescriptionLoading}<Loader className="absolute top-4 right-5 animate-spin" />{/if}
		<button
			class="c-btn-submit my-6 w-full disabled:cursor-not-allowed disabled:opacity-20"
			on:click={() =>
				handleGenerateContentClick({
					url: metaDescription.url,
					siteContent: metaDescription.description,
					siteTitle: metaDescription.title,
					index: i,
					isReadability: false,
				})}
			>Generate AI Content with Meta Description
		</button>
		<p>{metaDescription.description}</p>
	</div>
</section>
