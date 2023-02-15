<script lang="ts">
	import type { Tool } from '../../types';
	import Arrow from '../SVG/Arrow.svelte';
	export let tool: Tool;

	$: ({ name, url, featured_image, slug, description } = tool);
</script>

<a class="group" href={`/tools/${slug}`}>
	<article
		class="aspect-square rounded border-3 border-black transition-shadow group-hover:shadow-md"
	>
		<div
			class="flex justify-between border-b-3 border-black px-5 py-3 group-hover:bg-black group-hover:text-white"
		>
			<span class="font-display">Free</span>
			<Arrow className="[&_path]:group-hover:fill-white" />
		</div>
		<img class="aspect-video w-full" src={featured_image} alt={name} />
		<div class="border-t-3 border-black p-5 transition-colors group-hover:bg-beige">
			<h2 class="mb-[10px] text-2xl font-bold">{name}</h2>
			<p class="mb-5">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, repellendus?
			</p>
		</div>
	</article>
</a>
