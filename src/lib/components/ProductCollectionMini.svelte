<script lang="ts">
    import ProductCardMini from "./ProductCardMini.svelte";
    import type { ProductCollection } from "../../types/product";
	import Carousel from "./Carousel.svelte";

    export let collectionConfig: ProductCollection

    export let width:string = "w-2/3"
</script>

<div
class="flex flex-col items-center justify-center uppercase w-full">
    <h2
    class="py-6 text-2xl">
    {collectionConfig.name}
    </h2>
    <Carousel
    {width}>
        {#each collectionConfig.items as product, index (index)}
        <ProductCardMini productData={product} />
        {/each}
    </Carousel>
</div>