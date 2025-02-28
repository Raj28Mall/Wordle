<script>
    let character=$state('');
    let {disabled, id, rowid}=$props();

    const handleInput=()=>{
        if(character && /^[a-zA-Z]$/.test(character)){
            character = character.toUpperCase();
            const nextInput = document.getElementById(`box-${rowid}-${id+1}`);
            if(nextInput){
            nextInput.focus();
            }
        }
    }

    const clearBox=()=>{
        character='';
    }
</script>

<div class="w-[70px] h-[70px] border border-gray-500 text-white text-center flex justify-center items-center rounded">
    <input id="box-{rowid}-{id}" class="w-[70px] h-[70px] bg-transparent caret-transparent text-center text-3xl" type="text" required bind:value={character} {disabled} maxlength="1" oninput={handleInput} pattern="[a-zA-Z]">
</div>