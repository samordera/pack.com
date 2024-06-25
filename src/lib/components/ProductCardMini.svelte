<script lang="ts">
    export let productData: any;
</script>

<div
class="w-60 min-h-80 p-6 shadow-lg bg-white hover:opacity-80 hover:cursor-pointer active:scale-105"
on:click={() => {}}>
    <img class="h-56" src="{productData.photos[0]}" alt="" />
    <div
    class="flex flex-col">
        <p
        class="text-sm font-medium">
            {productData.name}
        </p>
        <div
        class=" flex space-x-4 items-baseline">
            <p
            class="text-xl font-bold">{productData.startPrice ? productData.startPrice : productData.finalPrice}</p>
            <p
            class="text-xs normal-case">{productData.startPrice ? "Negotiable" : "Not Negotiable"}</p>
        </div>
    </div>
</div>