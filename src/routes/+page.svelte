<script lang="ts">
  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "lightgray", "black", "white"];

  
</script>

<main class="h-full flex gap-8 p-8">
  <div class="flex flex-col gap-2 h-full">
    <!-- header -->
    <a href="/" class="text-[3.5rem] flex flex-col -space-y-8 font-bold">
      <h1>skribbl</h1>
      <h2 class="text-primary font-semibold tracking-[-0.1rem] text-[2.6rem]">hardmode</h2>
    </a>

    <!-- sidebar -->
    <div class="flex flex-col gap-8 grow border-3 border-primary bg-secondary justify-between rounded-xl p-6 drop-shadow-xl">
      <!-- arrow indicators -->
      <div class="size-36 relative text-primary text-5xl">
        <iconify-icon icon="mynaui:circle-solid" class="text-text text-4xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></iconify-icon>
        <iconify-icon icon="mynaui:fat-arrow-up-solid" class="absolute top-0 left-1/2 -translate-x-1/2"></iconify-icon>
        <iconify-icon icon="mynaui:fat-arrow-down-solid" class="absolute bottom-0 left-1/2 -translate-x-1/2"></iconify-icon>
        <iconify-icon icon="mynaui:fat-arrow-left-solid" class="absolute left-0 top-1/2 -translate-y-1/2"></iconify-icon>
        <iconify-icon icon="mynaui:fat-arrow-right-solid" class="absolute right-0 top-1/2 -translate-y-1/2"></iconify-icon>
      </div>

      <div class="overflow-y-auto grid grid-cols-2 gap-4 items-start">
        {#each colors as color, i}
          <div
            class="flex justify-center items-center border-3 rounded-xl aspect-square border-primary"
            style:background-color={color}
          >
            {#if i === 0}
              <iconify-icon icon="mingcute:check-2-fill" class="text-4xl text-bg"></iconify-icon>
            {/if}
          </div>
        {/each}
      </div>

      <div class="flex gap-2 w-full justify-center items-center">
        <iconify-icon icon="mdi:pencil-off" class="text-4xl"></iconify-icon>
        <p class="font-semibold text-xl">pen down</p>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-8 h-full grow">
    <canvas class="border-3 border-primary bg-white rounded-xl p-8 w-full grow drop-shadow-xl">

    </canvas>

    <div class="flex justify-center items-center h-24 w-full">
      <h2 class="font-bold text-primary text-5xl underline underline-offset-[12px]">pen up</h2>
    </div>
  </div>
</main>
