<script>
	import '../app.css';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		return () => {
			subscription.unsubscribe();
		};
	});
	import '@fontsource/unbounded';
</script>

<header class="flex flex-col items-center justify-center py-16 lg:py-24">
	<h1
		class="u-text-gradient u-background-gradient mb-8 font-display text-6xl uppercase lg:text-9xl"
	>
		Mos<span class="-mt-4 inline-block -translate-y-4 transform">a</span><span
			class="-mb-4 inline-block translate-y-4 transform">i</span
		>c
	</h1>
	<p class="tracking-normal lg:text-4xl">Navigating the world of AI</p>
</header>
<slot />
