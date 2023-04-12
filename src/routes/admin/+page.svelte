<script lang="ts">
	import { page } from '$app/stores';
	import BatchContent from '../../components/Admin/BatchContent.svelte';
	import SignIn from '../../components/Admin/SignIn.svelte';
</script>

{#if $page.data.session}
	<BatchContent />
{:else}
	<SignIn />
{/if}
