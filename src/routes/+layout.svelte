<script lang="ts">
	import "../app.css";
  import "iconify-icon";

	let { children } = $props();
</script>

<svelte:head>
  <title>SKRIBBL: hardmode</title>
</svelte:head>

<div class="grid-background h-screen">
  {@render children()}
</div>
