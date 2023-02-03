<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { tools } = data;
	$: ({ tools } = data);
</script>

<div class="grid min-h-screen place-items-center">
	<h1 class="text-center text-3xl">This is Mosaic!</h1>
	<ul>
		{#each tools as { title, url }}
			<li class="flex items-center gap-1">
				<h2 class="text-lg font-semibold">{title}</h2>
				<a href={url} class="text-blue-700 underline">Live site</a>
			</li>
		{/each}
	</ul>
</div>
