<script lang="ts">
	import { fade } from "svelte/transition";

    export let width: string = "w-1/2";
    export let height: string = "h-auto";

    let scrollRef: any;

    const scrollLeft = () => {
        scrollRef.scrollBy({ left: -300, behavior: 'smooth' });
    }

    const scrollRight = () => {
        scrollRef.scrollBy({ left: 300, behavior: 'smooth' });
    }

    let hovering: boolean = false
</script>

<div
role="group"
class="relative flex items-center {width} {height}"
on:mousemove={() => hovering = true}
on:mouseleave={() => hovering = false}>
    <div
    class="relative w-20 h-80">
        {#if hovering}
        <button
        in:fade
        out:fade
        class="relative btn h-full w-full right-0 z-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-2xl" 
        on:click={scrollLeft}>
            &lt;
        </button>
        {/if}
    </div>
    <div 
    class="flex overflow-x-auto overflow-y-visible scrollbar-hide scroll-smooth" 
    bind:this={scrollRef}>
        <div class="flex flex-nowrap space-x-4">
            <slot />
        </div>
    </div>
    <div
    class="relative w-20 h-80">
        {#if hovering}
        <button
        in:fade
        out:fade
        class="relative btn h-full w-full right-0 z-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r-2xl" 
        on:click={scrollRight}>
            &gt;
        </button>
        {/if}
    </div>
</div>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>
