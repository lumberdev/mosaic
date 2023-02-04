<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { tools } = data;
	$: ({ tools } = data);
</script>

<div class="grid min-h-screen place-items-center">
	<h1 class="text-center text-3xl">This is Mosaic!</h1>
	<ul>
		{#each tools as { name, url, slug }}
			<li class="flex items-center gap-1">
				<h2 class="text-lg font-semibold"><a href="/tools/{slug}">{name}</a></h2>
				<a href={url} target="_blank" rel="noreferrer" class="text-blue-700 underline">Live site</a>
			</li>
		{/each}
	</ul>
</div>
