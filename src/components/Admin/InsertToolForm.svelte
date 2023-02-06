<form
	method="POST"
	action="?/insert"
	class="flex min-h-screen w-full flex-col items-center justify-center"
>
	<h1 class="mb-2 text-5xl">Found a new cool AI tool?</h1>
	<p class="mb-8 opacity-70">Let's add it to Mosaic!</p>

	<label class="mb-12 flex flex-col items-start">
		<span class="block text-center">URL</span>
		<input
			class="w-full rounded-lg bg-gray-200 p-4"
			type="url"
			name="url"
			placeholder="https://example.com"
			required
		/>
	</label>
	<label class="mb-12 flex flex-col items-start">
		<span class="block text-center">Name</span>
		<input
			class="w-full rounded-lg bg-gray-200 p-4"
			type="name"
			name="name"
			placeholder="example"
			required
		/>
	</label>

	<button type="submit" class="rounded-lg bg-blue-500 py-4 px-16 text-white">Submit</button>
</form>
