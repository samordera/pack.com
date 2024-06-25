<script lang="ts">
	import { flip } from "svelte/animate";
	import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let clicked: boolean = false;
    export let width: string = "";
    export let height: string = "";
    export let otherClasses: string = "";
    export let placeholders: Array<string> | undefined = undefined;

    let searchFocused: boolean = clicked ? true : false;

    const dispatch = createEventDispatcher();
    
    let currentPlaceholderIdx = 0;

    function changePlaceholderText() {
        setTimeout(() => {
            changePlaceholderText()

            currentPlaceholderIdx = (currentPlaceholderIdx + 1) % placeholders?.length
        }, 5000)
    }

    changePlaceholderText()
</script>

{#if searchFocused}
<input
in:fly
out:fly
type="text"
class="input border-b-2 text-black {width} {height} {otherClasses}"
placeholder={placeholders ? placeholders[currentPlaceholderIdx] : ""} />
{:else}
<button
in:fade
class="btn"
on:click={() => { dispatch("buttonClicked"); searchFocused = true }}>
    <img src="" alt="search button">
</button>
{/if}