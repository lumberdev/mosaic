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
	{#if form?.success && form.body && form.body.data.length > 0}
		<p>Success!</p>
	{:else if form?.success === false}
		<p>Failure! Check the console for more information.</p>
	{/if}
{:else}
	<SignIn />
{/if}
