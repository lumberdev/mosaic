<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import type { ActionData } from '../../routes/$types';

	export let form: ActionData;

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

	const formSubheadingStyles = 'mb-7 text-center font-bold leading-6';

	let isSubmitting = false;
	const submitTool: SubmitFunction = ({ form }) => {
		isSubmitting = true;
		return async ({ result }) => {
			isSubmitting = false;
			if (result.type === 'success') {
				form.reset();
				await applyAction(result);
			}
		};
	};
</script>

<div class="mx-auto mt-16 max-w-3xl rounded border-3 border-black bg-white shadow-sm md:mt-24">
	<div class="bg-black px-5 py-4 font-display text-white">
		<h4>Submit an AI</h4>
	</div>
	<div class="flex flex-col items-center py-12 px-5">
		{#if !form}
			<div class={formSubheadingStyles}>
				<p>Want to share something cool?</p>
				<p>Submit your AI projects or some hidden gems!</p>
			</div>
		{:else if form.success}
			<div class={formSubheadingStyles}>
				<p>Thanks for submitting your AI!</p>
				<p>We'll review it and add it to the list.</p>
			</div>
		{:else if !form.success}
			<div class={formSubheadingStyles}>
				<p>Oops! Something went wrong.</p>
				<p>Try again later.</p>
			</div>
		{/if}
		<form
			id="submit-ai-form"
			method="POST"
			action="/?/submitTool"
			use:enhance={submitTool}
			class="flex w-full flex-col items-center gap-3 px-0 md:px-24">
			<Input {...urlInputAttributes} />
			<Input {...emailInputAttributes} />
			<Button {buttonLabel} disabled={isSubmitting} />
		</form>
	</div>
</div>
