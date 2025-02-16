<script>
    let character=$state('');
    let {disabled}=$props();
</script>

<div class="w-[70px] h-[70px] border border-gray-500 text-white text-center flex justify-center items-center">
    <input class="w-[70px] h-[70px] bg-transparent caret-transparent text-center text-3xl" type="text" required bind:value={character} {disabled} maxlength="1">
</div>