<script>
	export let data;
	const { tool } = data;
</script>

<div class="grid border-4 border-black md:grid-cols-2">
	<div class="border-r-4 border-black">
		<img src={tool.featured_image} class="h-full w-full object-cover" alt={tool.name} />
	</div>

	<div class="p-8">
		<h1 class="mb-4 text-2xl font-bold md:text-5xl">{tool?.name}</h1>
		<p class="mb-8">{tool?.description}</p>

		<a href={tool.url} class="italic underline">{tool.url}</a>
	</div>
</div>
