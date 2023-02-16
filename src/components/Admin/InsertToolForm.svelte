<script>
	import { DANGEROUSLY_PUBLIC_openai } from '../../utils/public-openai';

	let generationMethod = 'cached-content';
	let url = '';
	let name = '';
	let description = '';
	let tags = '';

	let isLoading = false;

	const generateContent = async () => {
		isLoading = true;
		const params = new URLSearchParams();
		params.set('url', url);
		params.set('generationMethod', generationMethod);

		const response = await fetch(`/api/generate-content?${params.toString()}`);

		const completion = await response.json();

		name = completion?.name || '';
		description = completion?.summary || '';
		tags = completion?.tags?.join(', ') || '';
	};

	const generateContentClientSide = async () => {
		isLoading = true;

		const params = new URLSearchParams();
		params.set('url', url);
		params.set('useCache', String(generationMethod === 'cached-content'));

		const site =
			generationMethod !== 'url'
				? await (await fetch(`/api/readability?${params.toString()}`)).json()
				: null;

		const prompt = !site
			? `Given this JSON structure:\n{ "name": "", "summary": "", "tags": [] }\nProvide a JSON object with the name, 5 catchy tags and a brief summary of this website: ${url}`
			: `Given this JSON structure:\n{ "name": "", "summary": "", "tags": [] }\nProvide a JSON object with the name, 5 catchy tags and a brief summary of this:\n${site?.textContent}`;

		const openAiResponse = await DANGEROUSLY_PUBLIC_openai.post('', {
			model: 'text-davinci-003',
			prompt,
			max_tokens: 500,
		});
		const [completion] = openAiResponse.data.choices ?? [];
		const data = completion?.text
			? JSON.parse(String(completion.text).trim().replace(/\n/g, ''))
			: null;

		name = data?.name || '';
		description = data?.summary || '';
		tags = data?.tags?.join(', ') || '';
		isLoading = false;
	};
</script>

<form
	method="POST"
	action="?/insert"
	class="mx-auto flex w-max flex-col items-center justify-center pt-8">
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
				<input type="radio" bind:group={generationMethod} name="method" value="url" />
				<span>URL</span>
			</label>
		</div>
	</div>

	<label class="c-field w-full">
		<span class="c-field-label">URL</span>
		<input
			class="c-field-input"
			type="url"
			name="url"
			bind:value={url}
			placeholder="https://example.com"
			required />
	</label>

	<div class="mb-12 w-full">
		<button
			type="button"
			class="c-btn-submit w-full disabled:cursor-not-allowed disabled:opacity-20"
			on:click={generateContentClientSide}
			disabled={isLoading}>
			Generate content
		</button>
	</div>

	<label class="c-field w-full">
		<span class="c-field-label">Name</span>
		<input
			class="c-field-input"
			type="name"
			name="name"
			bind:value={name}
			placeholder="example"
			required />
	</label>

	<label class="c-field w-full">
		<span class="c-field-label">Description</span>
		<textarea
			class="c-field-input"
			name="description"
			placeholder="Brief description..."
			bind:value={description}
			required />
	</label>

	<label class="c-field w-full">
		<span class="c-field-label">Tags</span>
		<input class="c-field-input" type="name" name="tags" bind:value={tags} />
	</label>

	<button type="submit" class="c-btn-submit w-full">Submit</button>
</form>
