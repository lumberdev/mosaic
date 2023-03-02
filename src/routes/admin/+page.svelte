<script>
	import { page } from '$app/stores';
	import InsertToolForm from '../../components/Admin/InsertToolForm.svelte';
	import SignIn from '../../components/Admin/SignIn.svelte';
	import SignOut from '../../components/Admin/SignOut.svelte';
	import SignUp from '../../components/Admin/SignUp.svelte';

	let isNewUser = false;

	const flipIsNewUser = () => {
		isNewUser = !isNewUser;
	};
</script>

{#if $page.data.session}
	<SignOut />
	<InsertToolForm />
{:else if isNewUser}
	<SignUp {flipIsNewUser} {isNewUser} />
{:else}
	<SignIn />
{/if}
