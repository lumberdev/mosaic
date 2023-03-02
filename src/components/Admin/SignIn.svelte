<script lang="ts">
	import { enhance } from '$app/forms';
	import LoginButton from './LoginButton.svelte';
	import LoginInputs from './LoginInputs.svelte';

	let email = '';
	let password = '';
</script>

<form use:enhance method="POST" action="?/signIn" class="mx-auto flex max-w-xl flex-col py-12">
	<LoginInputs {email} {password} />
	<LoginButton buttonLabel="Sign In" />
</form>
