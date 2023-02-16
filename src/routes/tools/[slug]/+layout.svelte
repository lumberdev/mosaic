<script>
	export let data;
	const { tool } = data;
</script>

<svelte:head>
	<title>Mosaic | {tool.name}</title>
	<meta name="description" content={tool.description} />
</svelte:head>
<slot />
