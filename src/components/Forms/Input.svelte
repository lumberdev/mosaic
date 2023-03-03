<script lang="ts">
	export let type: string;
	export let placeholder: string;
	export let id: string;
	export let name: string;
	export let value: string | number = '';

	const handleInput = (e: Event) => {
		if (e.target instanceof HTMLInputElement)
			value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
	};
</script>

<input
	class="w-full rounded border-3 border-black px-5 py-4 placeholder:text-black"
	{type}
	{placeholder}
	{id}
	{name}
	on:input={handleInput} />
