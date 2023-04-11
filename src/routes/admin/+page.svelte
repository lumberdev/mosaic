<script lang="ts">
	import { page } from '$app/stores';
	import BatchContent from '../../components/Admin/BatchContent.svelte';
	import SignIn from '../../components/Admin/SignIn.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	console.log(form);
</script>

{#if $page.data.session}
	<BatchContent />
{:else}
	<SignIn />
{/if}
