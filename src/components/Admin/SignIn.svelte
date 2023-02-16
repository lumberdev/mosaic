<script lang="ts">
	import LoginButton from './LoginButton.svelte';
	import LoginInputs from './LoginInputs.svelte';

	let email = '';
	let password = '';
</script>

<form method="POST" action="?/signIn" class="mx-auto flex max-w-xl flex-col py-12">
	<LoginInputs {email} {password} />
	<LoginButton buttonLabel="Sign In" />
</form>
