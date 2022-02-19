<style>

.select > .options {
	display: none;
}

.select:focus-within > .options {
	display: block;
}

.select:focus-within after {
    transform: scaleY(-1);
}

before , after {
    font-family: "Material Icons";
    transition: transform 0.2s;
}
</style>

<script>
    export let before = "warning"
    export let value = "Select"
    export let options = []
    export let id = ""
    const setVal = (e) => {
        value = e.target.getAttribute("value")
        e.target.parentNode.parentNode.blur()
    }
</script>

<div class="flex">
    <before class="p-2 focus-within:outline-none hover:bg-[#ffffff]/5 border rounded-l-md border-[#636363]">{before}</before>
    <div tabindex="0" id={id} value={value} class="select cursor-pointer relative focus-within:outline-none hover:bg-[#ffffff]/5">
        <div class="border-y border-r border-[#636363] rounded-r-md flex items-center p-2 gap-2">
            {value}
            <after>expand_more</after>
        </div>
        <div class="options absolute border border-[#636363] rounded-md py-2 bg-[#555555] overflow-y-auto overflow-x-hidden top-[150%] max-h-[8em]">
            {#each options as option}
                <div style="{id}:{option}" class="hover:bg-[#ffffff20] p-2 " on:click={setVal} value={option}>{option}</div>
            {/each}		
    	</div>	
    </div>
</div>