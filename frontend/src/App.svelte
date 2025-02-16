<script>
  import { onMount } from "svelte";
  import Navbar from "./Navbar/Navbar.svelte";
  import InputRow from "./InputRow/InputRow.svelte";
  let name = $state("");
  let isOpen = $state(false);
  let currRow = $state(0);
  let noOfRows = 6;
  let noOfBoxes = 5;
  let dialog;

  onMount(() => {
    dialog.showModal();
    isOpen = true;
    window.addEventListener("keydown", handleKeyPress);
  });

  const closeDialog = () => {
    dialog.close();
    isOpen = false;
  };

  const handleSubmit = () => {
    if (name) {
      closeDialog();
    }
  };

  const handleKeyPress = (event) => {
    let word = "";
    let filled = true;
    if (event.key === "Enter" && currRow < noOfRows) {
      for (let i = 0; i < noOfBoxes; i++) {
        const input = document.getElementById(`box-${currRow}-${i}`);
        if (!input.value) {
          filled = false;
          break;
        }
        word += input.value;
      }
      if (filled) {
        for (let i = 0; i < noOfBoxes; i++) {
          const input = document.getElementById(`box-${currRow}-${i}`);
          input.style.backgroundColor = "green";
          input.disabled = true;
        }
        currRow++;
      }
    }
  };
</script>

<main class="bg-[#121213] min-h-screen">
  <header>
    <Navbar {name} />
  </header>

  <section class="flex flex-col space-y-5 justify-center items-center h-[90vh]">
    {#each Array(noOfRows) as _, i}
      <InputRow id={i} {currRow} {noOfBoxes} />
    {/each}
  </section>

  {#if isOpen}
    <div class="fixed inset-0 backdrop-blur bg-black/50"></div>
  {/if}
</main>

<dialog class="bg-[#55555d] rounded-lg" bind:this={dialog}>
  <div class="w-[35vw] h-[25vh]">
    <form method="dialog">
      <fieldset class="mt-5">
        <legend class="header text-center text-2xl font-bold mb-6"
          >Welcome to Wordle!</legend
        >

        <div class="flex flex-col items-center space-y-5">
          <input
            class="nameinput px-2 py-1 rounded-lg"
            type="text"
            bind:value={name}
            required
            placeholder="Enter your name"
          />
          <button
            class="btn bg-green-500 rounded-xl px-4 py-2 hover:bg-green-600 active:bg-green-300"
            type="submit"
            onclick={handleSubmit}>Submit</button
          >
        </div>
      </fieldset>
    </form>
  </div>
</dialog>
