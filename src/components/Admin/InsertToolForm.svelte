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
			max_tokens: 500
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

<form method="POST" action="?/insert" class="flex w-full flex-col items-center justify-center">
	<h1 class="mb-2 text-5xl">Found a new cool AI tool?</h1>
	<p class="mb-8 opacity-70">Let's add it to Mosaic!</p>

	<div class="mb-8">
		<p class="mb-4 text-center">How do you want to summarize this website?</p>

		<div class="grid grid-cols-3 gap-2">
			<label class="rounded-lg bg-gray-200 p-2">
				<input
					type="radio"
					bind:group={generationMethod}
					name="method"
					value="cached-content"
					checked
				/>
				<span>Cached Content</span>
			</label>

			<label class="rounded-lg bg-gray-200 p-2">
				<input type="radio" bind:group={generationMethod} name="method" value="content" />
				<span>Website's Content</span>
			</label>

			<label class="rounded-lg bg-gray-200 p-2">
				<input type="radio" bind:group={generationMethod} name="method" value="url" />
				<span>URL</span>
			</label>
		</div>
	</div>

	<label class="mb-12 flex flex-col items-start">
		<span class="block text-center">URL</span>
		<input
			class="w-full rounded-lg bg-gray-200 p-4"
			type="url"
			name="url"
			bind:value={url}
			placeholder="https://example.com"
			required
		/>
	</label>

	<div class="mb-12">
		<button
			type="button"
			class="rounded-lg bg-green-400 py-4 px-16 text-white disabled:cursor-not-allowed disabled:opacity-20"
			on:click={generateContentClientSide}
			disabled={isLoading}
		>
			Generate content
		</button>
	</div>

	<label class="mb-12 flex flex-col items-start">
		<span class="block text-center">Name</span>
		<input
			class="w-full rounded-lg bg-gray-200 p-4"
			type="name"
			name="name"
			bind:value={name}
			placeholder="example"
			required
		/>
	</label>

	<label class="mb-12 flex flex-col items-start">
		<span class="block text-center">Description</span>
		<textarea
			class="w-full rounded-lg bg-gray-200 p-4"
			name="description"
			placeholder="Brief description..."
			bind:value={description}
			required
		/>
	</label>

	<label class="mb-12 flex flex-col items-start">
		<span class="block text-center">Tags</span>
		<input class="w-full rounded-lg bg-gray-200 p-4" type="name" name="tags" bind:value={tags} />
	</label>

	<button type="submit" class="rounded-lg bg-blue-500 py-4 px-16 text-white">Submit</button>
</form>
