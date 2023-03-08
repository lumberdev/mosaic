<script lang="ts">
	import Button from '../Forms/Button.svelte';
	import FormWrapper from '../Forms/FormWrapper.svelte';
	import Input from '../Forms/Input.svelte';

	const passwordInputAttributes = {
		type: 'password',
		placeholder: 'Enter your new password here',
		id: 'password',
		name: 'password',
		value: '',
	};

	const buttonLabel = 'Set Password';
</script>

<FormWrapper title="Set a password">
	<form method="post" action="?/setPassword" class="grid w-full items-center gap-4  ">
		<Input {...passwordInputAttributes} bind:value={passwordInputAttributes.value} />
		<Button {buttonLabel} />
	</form>
</FormWrapper>
