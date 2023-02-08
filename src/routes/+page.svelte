<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { tools } = data;
	$: ({ tools } = data);

	let randomImages = [...tools].sort(() => 0.5 - Math.random()).slice(0, 5);
</script>

<section class="min-h-screen">
	{#each tools as { name, url, slug, description, featured_image }}
		<article
			class="flex w-full items-stretch border-2 border-black first:border-t-4 last:border-b-4 lg:border-4 lg:first:border-t-8 lg:last:border-b-8"
		>
			<div class="aspect-video w-40 border-r-4 border-black bg-gray-200 md:w-96 lg:border-r-8">
				<img class="h-full w-full object-cover" src={featured_image} alt={name} />
			</div>

			<h2 class="group flex flex-1 items-stretch">
				<a
					href="/tools/{slug}"
					class="flex items-center p-8 text-2xl font-semibold transition-all duration-300 md:text-5xl"
				>
					<span class="group-hover:opacity-50">{name}</span>

					<span class="ml-4 hidden text-xs italic underline group-hover:block">{url}</span>
				</a>
			</h2>
		</article>
	{/each}
</section>
