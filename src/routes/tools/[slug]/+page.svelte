<script>
	import SubmitAi from '../../../components/Forms/SubmitAI.svelte';

	export let data;
	const { tool } = data;
	const { name, description, url, image, featured_image } = tool;
	const pricing = 'free';
	const shortDescription = description.substring(0, 300);
</script>

<section class="relative grid grid-cols-12 gap-5">
	<div
		class="col-start-2 col-end-8 mb-12  aspect-[660/433] rounded border-3 border-black object-cover  shadow-md">
		<img class="h-full overflow-hidden" src={featured_image} alt={name} />
	</div>
	<div class="relative col-start-8 col-end-12 mt-12 grid gap-8 rounded pt-9 pb-24 pl-5 pr-12">
		<div>
			<h1 class="text-2xl font-bold">{name}</h1>
			<a class="font-display" target="_blank" rel="noreferrer noopener" href={url}>{url}</a>
		</div>
		<p>{shortDescription}</p>
		<p class="font-display">Pricing: <span>{pricing}</span></p>
		<div
			class="absolute top-0 right-0 -z-10 grid h-full w-[calc(100%+52%)] rounded border-3 border-black bg-white">
			<div class="h-12 w-full self-end bg-black" />
		</div>
	</div>
</section>
<section>
	<SubmitAi />
</section>
