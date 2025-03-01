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
  // let guess_word=guess_words[Math.floor(Math.random() * guess_words.length)];
  let guess_word="HELLO";
  let dialog=null;

  onMount(() => {
    dialog.showModal();
    isOpen = true;
    window.addEventListener("keydown", async(event)=>{
      if(event.key=='Enter'){
        const guessed_word=await handleKeyPress(event);
        if(guessed_word && guessed_word.length===noOfBoxes){
          if(guessed_word===guess_word){
            const colour_reponse=await handleColourChange(guessed_word);
            if(colour_reponse){
              await tick();
            }
            setTimeout(()=>{
              alert("You won the game");
            },500);
          }
          else{
            let valid_guess=await checkValidity(guessed_word);
            if(valid_guess){
              await handleColourChange(guessed_word);
              const nextInput=document.getElementById(`box-${currRow}-0`);
              if(nextInput){
                nextInput.focus();
              }
            }
            else{
              alert("Invalid word");
              for(let i=noOfBoxes-1;i>=0;i--){
                const input = document.getElementById(`box-${currRow}-${i}`);
                input.value="";
                input.focus();
            }
          }
        }
      }
    }});
  });

  const closeDialog = () => {
    dialog.close();
    isOpen = false;
  };

  const handleSubmit = () => {
    if (name) {
      closeDialog();
    }
    const firstFocus=document.getElementById(`box-${currRow}-0`);
    if(firstFocus){
      firstFocus.focus();
    }
  };

  const handleKeyPress =async (event) => {
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
    else{
      console.log("Game Over");
    }

    if(currRow===noOfRows){
      console.log("Game Over");
    }
    return guessed_word;
  };

  const checkValidity=async(word)=>{
    const response=await axios.post("http://localhost:3000/check-word", { word: word })
    return(response.data.isValid);
  }

  const handleColourChange=async(word)=>{
    for(let i=0;i<noOfBoxes;i++){
      const input = document.getElementById(`box-${currRow}-${i}`);
      if(word[i]!=guess_word[i]){
        if(guess_word.includes(word[i])){
          input.style.backgroundColor="yellow";
        }
        else{
          input.style.backgroundColor="gray";
        }
      }
      else{
        input.style.backgroundColor="green";
      }
      input.disabled=true;
    }
    currRow++;
    await tick(); // cool ahh functionality
    return true;
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
