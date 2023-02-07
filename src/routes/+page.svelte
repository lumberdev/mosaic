<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { tools } = data;
	$: ({ tools } = data);

	let randomImages = [...tools].sort(() => 0.5 - Math.random()).slice(0, 5);
	console.log(randomImages);
</script>

<section class="grid min-h-screen place-items-center px-4 lg:grid-cols-2 lg:px-12">
	{#each tools as { name, url, slug, description }}
		<article class="flex items-stretch">
			<div class="aspect-square h-full w-24 border-2 border-black bg-gray-200" />

			<div class="flex-1 border-2 border-black p-8">
				<h2 class="mb-2 text-5xl font-semibold"><a href="/tools/{slug}">{name}</a></h2>
				<a href={url} class="mb-8 block italic underline">{url}</a>

				<p>{description}</p>
			</div>
		</article>
	{/each}
</section>
