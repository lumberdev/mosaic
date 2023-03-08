<script lang="ts">
	import SetPassword from '../../../components/Admin/SetPassword.svelte';
	import { page } from '$app/stores';
	const {
		data: { session },
	} = $page;
	const accessToken = session?.access_token;
</script>

<SetPassword />
