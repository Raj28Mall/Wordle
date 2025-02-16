<script>
    import InputBox from '../InputBox/InputBox.svelte';
    let {id, currRow}=$props();
    let disabled=$state(false);
    let noOfBoxes=5;
    if(id!=currRow){
        disabled=true;
    }
</script>

<div class="flex space-x-10">
    {#each Array(noOfBoxes) as _,i}
        <InputBox {disabled}/>
    {/each}
</div>