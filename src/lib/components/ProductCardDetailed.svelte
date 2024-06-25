<script lang="ts">
    import { fade } from "svelte/transition"
    export let productData: any;

    let showCondition = false
    let descriptionMaxLength = 90
</script>

<div
role="banner"
class="flex flex-col space-y-2 items-center justify-between p-3 shadow-sm w-96 min-h-96 hover:cursor-pointer text-black active:scale-105"
on:mouseenter={() => showCondition = true}
on:mouseleave={() => showCondition = false}>
    <div
    class="w-full h-3/5 relative">
        <img
        class="w-full h-full"
        src="{productData.photos[0]}"
        alt="{productData.name}" />
        {#if showCondition}
        <p
        in:fade
        out:fade
        class="absolute capitalize bg-black text-white w-full p-1 text-center">
            {productData.condition}
        </p>
        {/if}
    </div>
    <div
    class="flex flex-col space-y-2 w-full h-1/3 justify-between pt-2">
        <div
        class="flex flex-col justify-between items-start w-full text-lg h-4/5 overflow-hidden">
            <p
            class="w-full">
            {`${productData.description.length <= descriptionMaxLength ? productData.description : productData.description.substring(0, descriptionMaxLength)}...`}
            </p>
        </div>
        <div
        class="flex space-x-2 items-baseline justify-start h-1/5">
            <p
            class="text-xl font-bold">
                {productData.startPrice ? productData.startPrice : productData.finalPrice}
            </p>
            <p
            class="text-xs normal-case">
                {productData.startPrice ? "Negotiable" : "Not Negotiable"}
            </p>
        </div>
    </div>
</div>