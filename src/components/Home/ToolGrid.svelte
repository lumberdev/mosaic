<script lang="ts">
	import type { Tool } from '$lib/types';
	import ToolCard from './ToolCard.svelte';
	export let tools: Tool[];
</script>

<section class="grid gap-x-5 gap-y-12  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
	{#each tools as tool}
		<ToolCard {tool} />
	{/each}
</section>
