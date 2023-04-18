<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import SignOut from '../Admin/SignOut.svelte';
	import Button from '../Forms/Button.svelte';
	import Logo from '../SVG/Logo.svelte';

	const { url } = $page;
	$: buttonLabel = isAdmin ? 'Home' : 'Submit an AI';
	let isAdmin = /admin/i.test(url.pathname);
	afterNavigate(({ to }) => {
		isAdmin = /admin/i.test(to?.url.pathname ?? '');
	});
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
		<div class="flex gap-8">
			<SignOut />
			<Button as="a" href="/" className="md:block hidden" {buttonLabel} />
		</div>
	{:else}
		<div class="flex gap-8">
			{#if $page.data.session}
				<Button as="a" href="/admin" buttonLabel="Admin" />
			{/if}
			<Button as="a" href="#submit-ai-form" className="md:block hidden" {buttonLabel} />
		</div>
	{/if}
</header>
