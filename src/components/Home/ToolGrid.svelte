<script lang="ts">
	import type { Tool } from '../../types';
	import ToolCard from './ToolCard.svelte';
	export let tools: Tool[];
</script>

<section class="grid grid-cols-3 gap-x-5 gap-y-12 px-12">
	{#each tools as tool}
		<ToolCard {tool} />
	{/each}
</section>
