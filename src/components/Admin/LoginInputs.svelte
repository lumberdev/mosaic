<script>
	export let email = '';
	export let password = '';
</script>

<label>
	<span>Email</span>
	<input type="email" name="email" bind:value={email} placeholder="Enter your email" required />
</label>
<label>
	<span>Password</span>
	<input
		type="password"
		name="password"
		bind:value={password}
		placeholder="Enter your password"
		required
	/>
</label>
