<script>
	import '../app.css';
	import '@fontsource/unbounded';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	const navLinks = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Admin',
			href: '/admin'
		}
	];

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
</script>

<nav>
	<ul class="flex gap-8 py-4 px-4 lg:px-8 lg:py-8">
		{#each navLinks as { name, href }}
			<li>
				<a {href}>{name}</a>
			</li>
		{/each}
	</ul>
</nav>
<header class="flex flex-col items-center justify-center py-8 lg:py-16">
	<h1 class="mb-8 text-6xl font-semibold uppercase lg:text-9xl">Mosaic</h1>
	<p class="tracking-normal lg:text-4xl">Navigating the world of AI</p>
</header>

<slot />
