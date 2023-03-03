<script lang="ts">
	import Button from '../Forms/Button.svelte';
	import FormWrapper from '../Forms/FormWrapper.svelte';
	import Input from '../Forms/Input.svelte';

	const passwordInputAttributes = Array.from({ length: 2 }, (v, i) => ({
		type: 'password',
		placeholder: 'Enter your new password here',
		id: `password${i + 1}`,
		name: `password${i + 1}`,
		value: '',
	}));
	const buttonLabel = 'Set Password';
	const arePasswordsTheSame = () => {
		const [password1, password2] = passwordInputAttributes.map(
			(inputAttributes) => inputAttributes.value
		);
		return password1 === password2;
	};
</script>

<FormWrapper title="Set a password">
	<form method="post" action="?/setPassword" class="grid w-full items-center gap-4  ">
		{#each passwordInputAttributes as inputAttributes}
			<Input {...inputAttributes} bind:value={inputAttributes.value} />
			{#if !arePasswordsTheSame()}
				<p class="text-red-500">Passwords do not match</p>
			{/if}
		{/each}
		<Button {buttonLabel} />
	</form>
</FormWrapper>
