<script lang="ts">
	import '../app.css';
	import '@fontsource/silkscreen';
	import '@fontsource/spline-sans';
	import { supabase } from '$lib/supabase';
	import { afterNavigate, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Header from '../components/Layout/Header.svelte';
	import Footer from '../components/Layout/Footer.svelte';

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		return () => {
			subscription.unsubscribe();
		};
	});

	let previousPage: string | null = null;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname ?? previousPage;
	});
</script>

<svelte:head>
	<title>Mosaic | The AI Aggregator</title>
	<meta name="description" content="The AI aggregator tool, created by humans, summarized by AI" />
</svelte:head>

<main class="my-8 mx-4 min-h-screen md:mx-12">
	<Header />
	<a
		href={previousPage}
		class={`px-5 py-4 font-display ${!previousPage ? 'text-gray-500' : ''}`}
		aria-disabled={!previousPage}>← Back</a>
	<slot />
	<Footer />
</main>
