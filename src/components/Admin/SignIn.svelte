<script lang="ts">
	import LoginButton from './LoginButton.svelte';
	import LoginInputs from './LoginInputs.svelte';

	export let isNewUser: boolean;
	export let flipIsNewUser: () => void;

	let email = '';
	let password = '';
</script>

<form method="POST" action="?/signIn">
	<LoginInputs {email} {password} />
	<LoginButton buttonLabel="Sign In" />
</form>

{#if !isNewUser}
	<p>Don't have an account? <button on:click={flipIsNewUser}>Sign up</button></p>
{/if}
