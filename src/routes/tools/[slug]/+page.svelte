<script lang="ts">
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';
	import SubmitAi from '../../../components/Forms/SubmitAI.svelte';

	import type { ActionData } from '../../$types'; //Submit tool Action is set at the root
	import type { PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	const { tool } = data;
	const { name, description, url, featured_image } = tool;
	const pricing = 'unknown';
	const image_url =
		PUBLIC_SUPABASE_URL + '/storage/v1/object/public/tools-images/' + featured_image;
</script>

<section class="relative grid gap-5 md:grid-cols-12">
	<div
		class="aspect-[660/433] overflow-hidden rounded border-3 border-black object-cover shadow-md md:col-start-2 md:col-end-8  md:mb-12">
		<img class="h-full overflow-hidden " src={image_url} alt={name} />
	</div>
	<div
		class="relative mt-6 grid gap-8 rounded px-6 pt-6 pb-16 md:col-start-8 md:col-end-12 md:mt-12 md:pt-9 md:pb-24 md:pl-5 md:pr-12">
		<div>
			<h1 class="text-2xl font-bold">{name}</h1>
			<a class="font-display" target="_blank" rel="noreferrer noopener" href={url}>{url}</a>
		</div>
		<p>{description}</p>
		<p class="font-display">Pricing: <span>{pricing}</span></p>
		<div
			class="absolute top-0 right-0 -z-10 grid h-full w-full rounded border-3 border-black bg-white md:w-[calc(100%+52%)]">
			<div class="h-12 w-full self-end bg-black" />
		</div>
	</div>
</section>
<section>
	<SubmitAi {form} />
</section>
