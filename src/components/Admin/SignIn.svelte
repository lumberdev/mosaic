<script lang="ts">
	import { enhance } from '$app/forms';

	let email = '';
	let password = '';
</script>

<form use:enhance method="POST" action="?/signIn" class="mx-auto flex max-w-xl flex-col py-12">
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
	<button type="submit" class="c-btn-submit">Sign In</button>
</form>
