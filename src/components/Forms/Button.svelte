<script lang="ts">
	export let buttonLabel: string;
	export let className: string = '';
	export let as = 'button';
	export let href = '';
	const styles = `rounded border-3 border-black bg-white px-5 py-4 font-display text-lg font-bold shadow-sm hover:shadow-md ${className}`;
</script>

{#if as === 'button'}
	<button class={styles}>{buttonLabel}</button>
{:else if as === 'a'}
	<a {href} class={styles}>{buttonLabel}</a>
{/if}
