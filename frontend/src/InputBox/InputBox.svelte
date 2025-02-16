<script>
    let character=$state('');
    let {disabled, id}=$props();

    const handleInput=()=>{
        if(character && /^[a-zA-Z]$/.test(character)){
            character = character.toUpperCase();
            const nextInput = document.getElementById(`box${id+1}`);
            if(nextInput){
            nextInput.focus();
            }
        }
    }
</script>

<div class="w-[70px] h-[70px] border border-gray-500 text-white text-center flex justify-center items-center rounded">
    <input id="box{id}" class="w-[70px] h-[70px] bg-transparent caret-transparent text-center text-3xl" type="text" required bind:value={character} {disabled} maxlength="1" oninput={handleInput} pattern="[a-zA-Z]">
</div>