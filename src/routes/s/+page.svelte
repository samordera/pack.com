<script lang="ts">
    import ProductCardDetailed from "$lib/components/ProductCardDetailed.svelte";
    
    export let data: any;
</script>

<div
class="grid grid-cols-4 gap-2 p-4">
    {#each data.items as item, index (index)}
    <ProductCardDetailed
    productData={item}/>
    {/each}
</div>