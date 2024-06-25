import type { Product } from "../../types/product"

export function load() {
    const product: Product = {
        name: "",
        description: "",
        startPrice: 0,
        finalPrice: 0,
        condition: "used",
        photos: [],
    }

    return {
        product
    }
}