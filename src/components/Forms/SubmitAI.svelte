<script>
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	const buttonLabel = "Let's Go";

	const urlInputAttributes = {
		type: 'url',
		placeholder: 'Enter URL here',
		id: 'url',
		name: 'url',
	};

	const emailInputAttributes = {
		type: 'email',
		placeholder: 'Enter your email',
		id: 'email',
		name: 'email',
	};
</script>

<form class="mx-auto mt-24 max-w-3xl rounded border-3 border-black bg-white shadow-sm">
	<div class="bg-black px-5 py-4 font-display text-white">
		<h4>Submit an AI</h4>
	</div>
	<div class="flex flex-col items-center py-12">
		<div class="mb-7 text-center font-bold leading-6">
			<p>Want to share something cool?</p>
			<p>Submit your AI projects or some hidden gems!</p>
		</div>
		<div class="flex w-full flex-col items-center gap-3 px-12 md:px-24">
			<Input {...urlInputAttributes} />
			<Input {...emailInputAttributes} />
			<Button {buttonLabel} />
		</div>
	</div>
</form>
