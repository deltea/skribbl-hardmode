<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import { Separator } from "bits-ui";
</script>

<main class="h-full flex flex-col gap-16 p-8 justify-center items-center">
  <Header />

  <div class="flex flex-col gap-4">
    <button class="border-3 border-primary bg-secondary text-text rounded-xl px-6 py-3 shadow-md hover:scale-105 active:scale-100 font-bold text-xl duration-150 cursor-pointer">
      host a game
    </button>

    <div class="flex gap-2 items-center w-full">
      <Separator.Root orientation="horizontal" class="bg-primary grow h-1" />
      <p class="text-text font-semibold text-xl">or</p>
      <Separator.Root orientation="horizontal" class="bg-primary grow h-1" />
    </div>

    <div class="flex gap-2">
      <input
        type="text"
        name="join-code"
        id="join-code"
        placeholder="join code"
        maxlength="6"
        minlength="6"
        class="border-3 border-primary bg-secondary text-text rounded-xl px-6 py-3 shadow-md font-bold text-xl w-64 focus:outline-none focus:ring-2 focus:ring-primary duration-150 uppercase placeholder:lowercase"
      />

      <button class="border-3 border-primary bg-secondary text-text rounded-xl px-6 py-3 shadow-md hover:scale-105 active:scale-100 font-bold text-xl duration-150 cursor-pointer">
        join a game
      </button>
    </div>
  </div>
</main>
