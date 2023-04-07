<script lang="ts">
	import { page } from '$app/stores';
	import InsertToolForm from '../../components/Admin/InsertToolForm.svelte';
	import SignIn from '../../components/Admin/SignIn.svelte';
	import SignOut from '../../components/Admin/SignOut.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

{#if $page.data.session}
	<SignOut />
	<InsertToolForm {form} />
{:else}
	<SignIn />
{/if}
