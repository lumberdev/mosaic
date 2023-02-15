<script>
	import Logo from '../SVG/Logo.svelte';
</script>

<header class="my-8 mx-12 flex justify-between border-b-4 border-t-4 border-black py-5">
	<div class="flex items-center gap-3">
		<Logo />
		<div class="font-display">
			<h1 class="text-2xl font-bold"><a href="/">Mosaic</a></h1>
			<p>The AI Directory</p>
		</div>
	</div>
	<button
		class="rounded border-3 border-black bg-white px-5 py-4 font-display text-lg font-bold shadow-sm hover:shadow-md"
		>Submit an AI</button
	>
</header>
