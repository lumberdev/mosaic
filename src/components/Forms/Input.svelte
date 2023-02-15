<script lang="ts">
	export let type: string;
	export let placeholder: string;
	export let id: string;
	export let name: string;
</script>

<input
	class="w-full rounded border-3 border-black px-5 py-4 placeholder:text-black"
	{type}
	{placeholder}
	{id}
	{name} />
