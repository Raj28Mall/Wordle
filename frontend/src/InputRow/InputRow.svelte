    <script>
        import InputBox from '../InputBox/InputBox.svelte';
        let {id, currRow, noOfBoxes}=$props();
        let disabled=$state(true);
        
        $effect(() => {
            if(id==currRow){
                disabled=false;
            }
        });
        
    </script>

    <div id="Row{id}" class="flex space-x-10">
        {#each Array(noOfBoxes) as _,i}
            <InputBox {disabled} id={i} rowid={id}/>
        {/each}
    </div>