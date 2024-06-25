<script lang="ts">
    import { scale } from "svelte/transition";
    
    export let rounded: string = "rounded-full";
    export let width: string = "w-20";
    export let height: string = "h-10";
    export let otherClasses: string = "";
    
    let buttonActive: boolean = false;
</script>

<button
class="relative bg-black {rounded} {height} {width} p-0 flex flex-col items-center justify-center active:scale-105 transition-transform box-border {otherClasses}"
on:mouseenter={() => buttonActive = true}
on:mouseleave={() =>  buttonActive = false}
on:click={() => {}}>
    {#if !buttonActive}
    <span
    in:scale
    out:scale
    class="w-full h-full bg-white flex justify-center items-center transition-transform ease-in p-0 absolute {rounded}">
    </span>
    {/if}
    <span class="absolute {buttonActive ? 'text-white' : 'text-black'}">
        <slot />
    </span>
</button>