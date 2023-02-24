<script>
	import { enhance } from '$app/forms';
	import LoginButton from './LoginButton.svelte';
</script>

<form method="POST" action="?/signOut" use:enhance>
	<button type="submit" class="px-5 py-4 font-display">← Sign Out</button>
</form>
