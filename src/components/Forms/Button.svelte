<script lang="ts">
	export let buttonLabel: string;
	export let className: string = '';
</script>

<button
	class={`rounded border-3 border-black bg-white px-5 py-4 font-display text-lg font-bold shadow-sm hover:shadow-md ${className}`}
	>{buttonLabel}</button>
