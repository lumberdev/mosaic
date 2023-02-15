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

<main class="my-8 mx-12">
	<Header />
	<slot />
	<Footer />
</main>
