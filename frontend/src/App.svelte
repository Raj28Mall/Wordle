<script>
  import { onMount, tick } from "svelte";
  import Navbar from "./Navbar/Navbar.svelte";
  import InputRow from "./InputRow/InputRow.svelte";
  import guess_words from "./data/guess_words.js";
  import axios from "axios";
  let name = $state("");
  let isOpen = $state(false);
  let currRow = $state(0);
  let noOfRows = 6;
  let noOfBoxes = 5;
  let guess_word;
  let dialog = null;

  onMount(() => {
    dialog.showModal();
    isOpen = true;
    getWord();
    window.addEventListener("keydown", async (event) => {
      if (event.key == "Enter") {
        const guessed_word = await handleKeyPress(event);
        if (guessed_word && guessed_word.length === noOfBoxes) {
          if (guessed_word === guess_word) {
            const colour_reponse = await handleColourChange(guessed_word);
            if (colour_reponse) {
              await tick();
            }
            setTimeout(() => {
              alert("You won the game");
              handleNewGame();
            }, 500);
          } else {
            let valid_guess = await checkValidity(guessed_word);
            if (valid_guess) {
              const colour_reponse = await handleColourChange(guessed_word);
              if (colour_reponse) {
                await tick();
              }
              const nextInput = document.getElementById(`box-${currRow}-0`);
              if (nextInput) {
                nextInput.focus();
              }
              if(currRow>=noOfRows && guessed_word!=guess_word){
                setTimeout(() => {
                  alert("You lost the game. The word was "+guess_word);
                  handleNewGame();
                }, 500);
              }
            } else {
              await handleInvalidWord();
              await tick();
            }
          }
        }
      }
    });
  });

  const closeDialog = () => {
    dialog.close();
    isOpen = false;
  };

  const handleSubmit = () => {
    if (name) {
      closeDialog();
    }
    const firstFocus = document.getElementById(`box-${currRow}-0`);
    if (firstFocus) {
      firstFocus.focus();
    }
  };

  const getWord = () => {
    // guess_word="HELLO";
    guess_word = (guess_words[Math.floor(Math.random() * guess_words.length)]).toUpperCase();
    console.log(guess_word);
  };

  const handleNewGame=async()=>{
    currRow=0;
    await clearBoard();
    getWord();
  }

  const handleKeyPress = async (event) => {
    let guessed_word = "";
    let filled = true;
    if (currRow < noOfRows) {
      for (let i = 0; i < noOfBoxes; i++) {
        const input = document.getElementById(`box-${currRow}-${i}`);
        if (!input.value) {
          filled = false;
          break;
        }
        guessed_word += input.value;
      }
    }
    return guessed_word;
  };

  const checkValidity = async (word) => {
    const response = await axios.post("http://localhost:3000/check-word", {
      word: word,
    });
    return response.data.isValid;
  };

  const handleColourChange = async (word) => {
    for (let i = 0; i < noOfBoxes; i++) {
      const input = document.getElementById(`box-${currRow}-${i}`);
      if (word[i] != guess_word[i]) {
        if (guess_word.includes(word[i])) {
          input.style.backgroundColor = "yellow";
        } else {
          input.style.backgroundColor = "gray";
        }
      } else {
        input.style.backgroundColor = "green";
      }
      input.disabled = true;
    }
    currRow++;
    await tick(); // cool ahh functionality
    return true;
  };

  const handleInvalidWord = async () => {
    for (let i = noOfBoxes - 1; i >= 0; i--) {
      const input = document.getElementById(`box-${currRow}-${i}`);
      input.style.backgroundColor = "red";
    }
    await tick();
    setTimeout(() => {
      for (let i = noOfBoxes - 1; i >= 0; i--) {
      const input = document.getElementById(`box-${currRow}-${i}`);
      input.value = "";
      input.style.backgroundColor="transparent";
      input.focus();
    }
    }, 1000);
    await tick();
    
  };

  const clearBoard = async () => {
    currRow = -1; 
    await tick(); 
    currRow = 0;   
    await tick(); 

    for (let i = 0; i < noOfRows; i++) {
      for (let j = 0; j < noOfBoxes; j++) {
        const input = document.getElementById(`box-${i}-${j}`);
        if (input) {
          input.value = "";
          input.style.backgroundColor = "transparent";
        }
      }
    }
    const input = document.getElementById(`box-0-0`);
    input.focus();
    await tick();
}
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
