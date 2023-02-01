<script lang="ts">
	import { stringify } from 'postcss';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="grid min-h-screen place-items-center">
	<h1 class="text-center text-3xl">This is Mosaic!</h1>

  <pre>{ JSON.stringify(data.tools, null, 2) }</pre>
</div>
