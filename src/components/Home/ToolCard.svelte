<script lang="ts">
	import Arrow from '../SVG/Arrow.svelte';
	export let tool;

	const { name, featuredImage, slug, description } = tool;
	const shortDescription = description?.split(' ').slice(0, 20).join(' ') + '...';
</script>

<a class="group" href={`/tools/${slug}`}>
	<article
		class="flex h-full flex-col rounded border-3 border-black transition-shadow group-hover:shadow-md">
		<div
			class="flex justify-between border-b-3 border-black px-5 py-3 group-hover:bg-black group-hover:text-white">
			<span class="font-display" />
			<Arrow className="[&_path]:group-hover:fill-white" />
		</div>
		<img
			class="aspect-video w-full"
			src={featuredImage.url}
			alt={featuredImage.description ?? name} />
		<div
			class="flex-auto rounded-b border-t-3 border-black p-5 transition-colors group-hover:bg-beige">
			<h2 class="mb-3 text-2xl font-bold">{name}</h2>
			<p class="mb-5 ">
				{shortDescription}
			</p>
		</div>
	</article>
</a>
