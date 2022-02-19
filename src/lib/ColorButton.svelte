<script>
    export let value = "Select"
    export let id = ""
    const setVal = (e) => {
        value = e.target.getAttribute("value")
        e.target.parentNode.parentNode.blur()
    }
</script>

<div id={id} value={value} tabindex="0" class="select cursor-pointer relative w-fit focus-within:outline-none">
    <input type="color" bind:value={value}>
</div>