import type { Category } from "./apis";

export interface CategoryList {
    id: number,
    name: string,
    slug: string,
    enabled: boolean,
    priority: number,
    mapped: boolean,
    parent: null | number,
    children: [] | Category[]
}