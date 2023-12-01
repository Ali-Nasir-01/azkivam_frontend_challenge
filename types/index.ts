import type { Category } from "./apis";

export interface CategoryList {
    id: number,
    name: string,
    slug: string,
    enabled: boolean,
    priority: number,
    mapped: boolean,
    parent: null | number,
    open: boolean,
    children: [] | Category[]
}

export interface IProduct {
    id: string,
    name: string,
    slug: string,
    available: boolean,
    categoryId: number,
    categoryName: string,
    minPrice: number,
    maxPrice: number,
    imageUrl: string,
    azkivam: boolean,
    hidden: boolean,
    merchantName: string,
    merchantId: number
}