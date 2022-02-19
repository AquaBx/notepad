<style>
before{
    font-family: "Material Icons";
    transition: transform 0.2s;
}
</style>

<script>
    export let before = "warning"
    export let value = "Select"
    export let type = "text"
    export let id = ""
    export let ext = ""
    const setVal = (e) => {
        value = e.target.getAttribute("value")
        e.target.parentNode.parentNode.blur()
    }
</script>

<div value={value + ext} id={id} class="flex border rounded-md border-[#636363]">
    <before class="p-2 focus-within:outline-none hover:bg-[#ffffff]/5 border-r border-[#636363]">{before}</before>
    {#if type == "number"} 
        <input type="number" class="p-2 focus-within:outline-none bg-transparent text-right max-w-[7rem]" bind:value/>
    {:else}
        <input type="text" class="p-2 focus-within:outline-none bg-transparent text-right max-w-[7rem]" bind:value/>
    {/if}
</div>