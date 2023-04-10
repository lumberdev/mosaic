<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	let previousPage: string | null = null;
	afterNavigate(({ from }) => {
		if (from?.url.pathname === '/admin') previousPage = '/';
		else previousPage = from?.url.pathname ?? previousPage;
	});
</script>

<a
	href={previousPage}
	class={`px-5 py-4 font-display ${!previousPage ? 'text-gray-500' : ''}`}
	aria-disabled={!previousPage}>← Back</a>
