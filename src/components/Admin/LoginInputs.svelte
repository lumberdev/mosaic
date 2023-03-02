<script>
	export let email = '';
	export let password = '';
</script>

<label class="c-field">
	<span class="c-field-label">Email</span>
	<input
		class="c-field-input"
		type="email"
		name="email"
		bind:value={email}
		placeholder="Enter your email"
		required />
</label>

<label class="c-field">
	<span class="c-field-label">Password</span>
	<input
		class="c-field-input"
		type="password"
		name="password"
		bind:value={password}
		placeholder="Enter your password"
		required />
</label>
