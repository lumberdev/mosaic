<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { tools } = data;
	$: ({ tools } = data);

  let randomImages = [...tools].sort(() => 0.5 - Math.random()).slice(0, 5);
  console.log(randomImages);
</script>

<section class="grid min-h-screen place-items-center px-4 lg:px-12 lg:grid-cols-2">
  {#each tools as { name, url, slug, description }}
    <article class="flex items-stretch">
      <div class="w-24 h-full aspect-square border-2 border-black bg-gray-200">

      </div>

      <div class="flex-1 p-8 border-2 border-black">
        <h2 class="text-5xl font-semibold mb-2"><a href="/tools/{slug}">{name}</a></h2>
        <a href={url} class="italic underline mb-8 block">{url}</a>

        <p>{description}</p>
      </div>
    </article>
  {/each}
</section>
