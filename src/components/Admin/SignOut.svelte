<script>
	import LoginButton from './LoginButton.svelte';
</script>

<form method="POST" action="?/signOut">
	<LoginButton buttonLabel="Sign Out" />
</form>
