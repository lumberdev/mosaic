<script lang="ts">
	import { enhance } from '$app/forms';

	let generationMethod = 'cached-content';
	let urls = '';
	let isLoading = false;
</script>

<form
	use:enhance
	method="POST"
	action="?/batchContent"
	class="mx-auto flex w-max  flex-col items-center justify-center pt-8">
	<h1 class="mb-4 font-display text-5xl">Found a new cool AI tool?</h1>
	<p class="mb-8">Let's add it to Mosaic!</p>

	<div class="mb-8 w-max">
		<p class="mb-4 text-center font-display">How do you want to summarize this website?</p>

		<div class="grid w-full grid-cols-3 gap-2">
			<label class="rounded border-3 border-black bg-white px-5 py-4">
				<input
					type="radio"
					bind:group={generationMethod}
					name="method"
					value="cached-content"
					checked />
				<span>Cached Content</span>
			</label>

			<label class="rounded border-3 border-black bg-white px-5 py-4">
				<input type="radio" bind:group={generationMethod} name="method" value="content" />
				<span>Website's Content</span>
			</label>

			<label class="rounded border-3 border-black bg-white px-5 py-4">
				<input type="radio" bind:group={generationMethod} name="method" value="meta" />
				<span>Website Meta Tag</span>
			</label>

			<label class="rounded border-3 border-black bg-white px-5 py-4">
				<input type="radio" bind:group={generationMethod} name="method" value="url" />
				<span>URL</span>
			</label>
		</div>
	</div>

	<label class="c-field w-full">
		<span class="c-field-label">List of URLs, comma separated</span>
		<textarea
			class="c-field-input"
			name="urls"
			bind:value={urls}
			placeholder="https://example.com"
			required />
	</label>

	<div class="mb-12 w-full">
		<button
			type="submit"
			class="c-btn-submit w-full disabled:cursor-not-allowed disabled:opacity-20"
			disabled={isLoading}>
			Generate content
		</button>
	</div>
</form>
