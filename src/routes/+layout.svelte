<script>
	import '../app.css';
	import '@fontsource/silkscreen';
	import '@fontsource/spline-sans';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
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
</script>

<svelte:head>
	<title>Mosaic | The AI Aggregator</title>
	<meta name="description" content="The AI aggregator tool, created by humans, summarized by AI" />
</svelte:head>

<main class="my-8 mx-4 min-h-screen md:mx-12">
	<Header />
	<slot />
	<Footer />
</main>
