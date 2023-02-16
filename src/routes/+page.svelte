<script lang="ts">
	import SubmitAi from '../components/Forms/SubmitAI.svelte';
	import ToolGrid from '../components/Home/ToolGrid.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { tools } = data;

	let randomImages = [...tools].sort(() => 0.5 - Math.random()).slice(0, 5);
</script>

<h1 class="mx-auto mb-24 w-fit text-center font-display text-5xl font-bold">
	Created By humans, <br /> Summarized by AI
</h1>
<ToolGrid {tools} />
<SubmitAi />
