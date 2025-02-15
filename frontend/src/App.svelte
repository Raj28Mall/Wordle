<script>
  let name = $state("Raj");
  import Navbar from './Navbar/Navbar.svelte';
</script>

<main class="bg-[#121213] min-h-screen">
  <header>
    <Navbar name={name}/>
  </header>
</main>
