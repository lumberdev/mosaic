<script lang="ts">
	import LoginButton from './LoginButton.svelte';
	import LoginInputs from './LoginInputs.svelte';

	export let isNewUser: boolean;
	export let flipIsNewUser: () => void;

	let email = '';
	let password = '';
</script>

<form method="POST" action="?/signUp">
	<LoginInputs {email} {password} />
	<LoginButton buttonLabel="Sign Up" />
</form>

{#if isNewUser}
	<p>Already have an account? <button on:click={flipIsNewUser}>Sign in</button></p>
{/if}
