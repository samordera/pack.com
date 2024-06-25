import type { User } from "./user"

export type ProductCollection = {
    name: string,
    description?: string,
    items: Array<Product>
}

export interface Product {
    name: string,
    category?: string,
    startPrice: number | null,
    finalPrice: number | null,
    condition? : string,
    photos: string[],
    video?: string,
    views?: number,
    description:string,
    brand?: string,
    quantity?: number,
    agentsAssigned?: User[],
    agencyCommission?: number,
    created?: Date,
    lastModified?: Date,
    tags?: string[]
}