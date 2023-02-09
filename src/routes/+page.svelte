<script lang="ts">
	import ToolCard from '../components/Home/ToolCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { tools } = data;
	$: ({ tools } = data);

	let randomImages = [...tools].sort(() => 0.5 - Math.random()).slice(0, 5);
</script>

<section class="min-h-screen">
	{#each tools as tool}
		<ToolCard {tool} />
	{/each}
</section>
