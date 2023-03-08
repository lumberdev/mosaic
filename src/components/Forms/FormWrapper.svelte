<script lang="ts">
	export let title: string;
</script>

<div class="mx-auto mt-16 max-w-3xl rounded border-3 border-black bg-white shadow-sm md:mt-24">
	<div class="bg-black px-5 py-4 font-display text-white">
		<h4>{title}</h4>
	</div>
	<div class="flex flex-col items-center py-12 px-5">
		<slot />
	</div>
</div>
