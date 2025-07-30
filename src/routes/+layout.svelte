<script lang="ts">
	import "../app.css";
  import "iconify-icon";

	let { children } = $props();
</script>

<div class="grid-background h-screen">
  {@render children()}
</div>
