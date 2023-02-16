<script>
	import Button from '../Forms/Button.svelte';
	import Logo from '../SVG/Logo.svelte';
	const buttonLabel = 'Submit an AI';
</script>

<header
	class="mb-20 flex flex-col justify-between border-b-4 border-t-4 border-black py-5 md:flex-row">
	<div class="flex items-center gap-3">
		<Logo />
		<div class="font-display">
			<h2 class="text-2xl font-bold"><a href="/">Mosaic</a></h2>
			<p>The AI Directory</p>
		</div>
	</div>
	<Button className="md:block hidden" {buttonLabel} />
</header>
