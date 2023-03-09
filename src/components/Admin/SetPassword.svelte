<script lang="ts">
	import Button from '../Forms/Button.svelte';
	import FormWrapper from '../Forms/FormWrapper.svelte';
	let password = '';
	const buttonLabel = 'Set Password';
</script>

<FormWrapper title="Set a password">
	<form method="post" action="?/setPassword" class="grid w-full items-center gap-4  ">
		<label class="c-field w-full">
			<span class="c-field-label">Password</span>
			<input
				class="c-field-input"
				type="password"
				name="password"
				bind:value={password}
				placeholder="Enter your new password here"
				required />
		</label>
		<Button {buttonLabel} />
	</form>
</FormWrapper>
