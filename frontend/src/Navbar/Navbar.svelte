    <script>
        let {name}=$props();
    </script>

    <div class="bg-[#121213] h-[8vh] max-h-[10vh] border-b-[1px] border-b-[#f5f5f7]/20 flex items-center">
        <div class="header text-white relative left-[47.5%] text-2xl">Wordle</div>
        <div class="welcome text-white relative left-[83%] flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Account" class="w-[30px] h-[30px]"/>
            <div class="px-3 w-[9vw] truncate">{name}</div>
        </div>
    </div>