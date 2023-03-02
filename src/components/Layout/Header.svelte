<script lang="ts">
	import { page } from '$app/stores';
	import Button from '../Forms/Button.svelte';
	import Logo from '../SVG/Logo.svelte';

	const { route } = $page;
	const isAdmin = /admin/i.test(route.id!);
	const buttonLabel = isAdmin ? 'Back to Home' : 'Submit an AI';
	console.log($page);
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
	{#if isAdmin}
		<Button as="a" href="/" className="md:block hidden" {buttonLabel} />
	{:else}
		<Button as="a" href="#submit-ai-form" className="md:block hidden" {buttonLabel} />
	{/if}
</header>
