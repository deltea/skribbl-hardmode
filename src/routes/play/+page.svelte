<script lang="ts">
  import P5, { type Sketch } from "p5-svelte";
  import { animate } from "animejs";
  import Header from "$lib/components/Header.svelte";

  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "lightgray", "black", "white"];
  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

  let transcriptElement: HTMLElement;
  let canvas: HTMLCanvasElement;
  let canvasContainer: HTMLDivElement;
  let penElement: HTMLElement;

  let sketch: Sketch;

  let currentSpeech = "click to start";
  let processedSpeech: string[];
  let penPosition = { x: 0, y: 0 };
  let lastPenPosition = { x: 0, y: 0 };
  let currentState = {
    color: "red",
    penDown: true,
    position: { x: 0, y: 0 },
    size: 10,
  }

  let width: number;
  let height: number;

  sketch = (p5) => {
    p5.setup = () => {
      width = canvasContainer.clientWidth;
      height = canvasContainer.clientHeight;

      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;

      recognition.onresult = (e: any) => {
        console.log("speech recognition result:", e);
        currentSpeech = e.results[0][0].transcript.toLowerCase().trim();
        processedSpeech = currentSpeech.split(" ");

        if (processedSpeech.length > 0) {
          processedSpeech[0] = convertToNumber(processedSpeech[0]);

          // move pen
          if (+processedSpeech[0] && processedSpeech.length >= 2) {
            const distance = +processedSpeech[0];
            const direction = processedSpeech[1];
            if (direction === "up") {
              currentState.position.y -= distance;
            } else if (direction === "down") {
              currentState.position.y += distance;
            } else if (direction === "left") {
              currentState.position.x -= distance;
            } else if (direction === "right") {
              currentState.position.x += distance;
            } else {
              console.warn("unrecognized direction:", direction);
            }

            animate(penPosition, {
              x: currentState.position.x,
              y: currentState.position.y,
              duration: 500,
              onComplete: () => {
                lastPenPosition = { ...penPosition };
              }
            });

            animate(penElement, {
              translateX: currentState.position.x,
              translateY: currentState.position.y,
              duration: 500,
            });
          } else if (processedSpeech[0] === "start") {
            // start drawing
            currentState.penDown = true;
          } else if (processedSpeech[0] === "stop") {
            // stop drawing
            currentState.penDown = false;
          } else if (processedSpeech[0] === "bigger") {
            currentState.size += 5;
            if (currentState.size > 50) {
              currentState.size = 50;
            }
          } else if (processedSpeech[0] === "smaller") {
            currentState.size -= 5;
            if (currentState.size < 5) {
              currentState.size = 5;
            }
          } else if (processedSpeech[0] === "clear") {
            // clear canvas
            p5.background(255);

            currentState.position = { x: 0, y: 0 };
            lastPenPosition = { x: 0, y: 0 };
            penPosition = { x: 0, y: 0 };
            animate(penElement, {
              translateX: currentState.position.x,
              translateY: currentState.position.y,
              duration: 500,
            });
          } else if (colors.includes(processedSpeech.join(""))) {
            // change color to [0]
            currentState.color = processedSpeech.join("");
          } else {
            console.warn("unrecognized command:", processedSpeech);
          }
        }

        console.log("processed speech:", processedSpeech);
        recognition.stop();
      }
      recognition.onstart = () => {
        console.log("speech recognition started");
        currentSpeech = "listening...";
      };
      recognition.onerror = (e: any) => {
        console.error("speech recognition error:", e);
      };
      recognition.onend = () => {
        console.log("speech recognition ended");
        setTimeout(() => {
          recognition.start();
        }, 1000);
      };

      transcriptElement.addEventListener("click", () => {
        recognition.start()
      });

      p5.createCanvas(width, height, p5.WEBGL, canvas);

      currentState.position = { x: 0, y: 0 };
    };

    p5.draw = () => {
      if (currentState.penDown) {
        p5.stroke(currentState.color);
        p5.strokeWeight(currentState.size);
        p5.line(lastPenPosition.x, lastPenPosition.y, penPosition.x, penPosition.y);
      }
    };
  };


  function convertToNumber(text: string): string {
    if (numbers.includes(text)) {
      return numbers.indexOf(text).toString();
    } else {
      return text;
    }
  }
</script>

<main class="h-full flex gap-8 px-8 pb-8">
  <div class="flex flex-col gap-4 h-full items-center pt-4">
    <!-- header -->
    <Header />

    <!-- sidebar -->
    <div class="flex flex-col gap-8 grow border-3 border-primary bg-secondary justify-between rounded-xl p-6 shadow-2xl">
      <!-- arrow indicators -->
      <div class="size-34 relative text-primary text-5xl">
        <iconify-icon
          icon="mynaui:circle-solid"
          class="text-text text-4xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        </iconify-icon>
        <iconify-icon
          icon="mynaui:fat-arrow-up-solid"
          class="absolute top-0 left-1/2 -translate-x-1/2 {processedSpeech && processedSpeech.length >= 2 && +processedSpeech[0] && processedSpeech[1] === "up" ? "text-text" : "text-primary"}"
        ></iconify-icon>
        <iconify-icon
          icon="mynaui:fat-arrow-down-solid"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 {processedSpeech && processedSpeech.length >= 2 && +processedSpeech[0] && processedSpeech[1] === "down" ? "text-text" : "text-primary"}"
        ></iconify-icon>
        <iconify-icon
          icon="mynaui:fat-arrow-left-solid"
          class="absolute left-0 top-1/2 -translate-y-1/2 {processedSpeech && processedSpeech.length >= 2 && +processedSpeech[0] && processedSpeech[1] === "left" ? "text-text" : "text-primary"}"
        ></iconify-icon>
        <iconify-icon
          icon="mynaui:fat-arrow-right-solid"
          class="absolute right-0 top-1/2 -translate-y-1/2 {processedSpeech && processedSpeech.length >= 2 && +processedSpeech[0] && processedSpeech[1] === "right" ? "text-text" : "text-primary"}"
        ></iconify-icon>
      </div>

      <div class="overflow-y-auto grid grid-cols-2 gap-2 items-start">
        {#each colors as color}
          <div
            class="flex justify-center items-center border-3 rounded-xl aspect-square border-primary p-1 relative"
          >
            <div class="size-full rounded-lg" style:background-color={color}></div>
            {#if color === currentState.color}
              <iconify-icon icon="mingcute:check-2-fill" class="absolute text-4xl text-text"></iconify-icon>
            {/if}
          </div>
        {/each}
      </div>

      <div class="flex gap-2 w-full justify-center items-center">
        <iconify-icon icon={currentState.penDown ? "mdi:pencil" : "mdi:pencil-off"} class="text-4xl"></iconify-icon>
        <p class="font-semibold text-xl">pen {currentState.penDown ? "down" : "up"}</p>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-4 h-full grow items-center pt-8">
    <div bind:this={canvasContainer} class="border-3 border-primary bg-white rounded-xl p8 shadow-2xl grow w-full relative">
      <canvas bind:this={canvas} class="rounded-xl"></canvas>
      <P5 {sketch} />

      <!-- pen -->
      <iconify-icon bind:this={penElement} icon="mdi:pencil" style="left: {width / 2}px; top: {height / 2}px" class="text-4xl absolute -translate-x-1 -translate-y-8"></iconify-icon>
    </div>

    <h2 bind:this={transcriptElement} class="flex justify-center items-center font-bold text-primary text-5xl underlin underline-offset-[12px] text-center size-full cursor-pointer h-20">
      {currentSpeech}
    </h2>
  </div>
</main>
