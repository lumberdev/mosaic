<script lang="ts">
	import ToolCard from '../components/Home/ToolCard.svelte';
	import ToolGrid from '../components/Home/ToolGrid.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { tools } = data;
	$: ({ tools } = data);

	let randomImages = [...tools].sort(() => 0.5 - Math.random()).slice(0, 5);
</script>

<ToolGrid {tools} />
