<script lang="ts">
	import SubmitAi from '../components/Forms/SubmitAI.svelte';
	import ToolGrid from '../components/Home/ToolGrid.svelte';
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	const { tools } = data ?? {};
</script>

<h1 class="mx-auto mb-24 w-fit text-center font-display text-5xl font-bold">
	Created By humans, <br /> Summarized by AI
</h1>
<ToolGrid {tools} />
<SubmitAi {form} />
