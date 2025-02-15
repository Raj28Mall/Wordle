<script>
  import { onMount } from "svelte";
  let name = $state("Chinaaaaaaaaaaaaaaaaaaaaaa");
  let dialog;
  import Navbar from './Navbar/Navbar.svelte';
  
  onMount(() => {
    dialog.showModal();
  });

  const closeDialog=()=>{
    dialog.close();
  }

</script>

<main class="bg-[#121213] min-h-screen">
  <header>
    <Navbar name={name}/>
  </header>
</main>


<dialog bind:this={dialog}>
  <form method="dialog">
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} required placeholder="Enter your name">
    <button type="submit" onclick={closeDialog}>Submit</button>
  </form>
</dialog>
