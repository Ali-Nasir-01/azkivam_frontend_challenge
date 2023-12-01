export interface Category {
    id: number,
    name: string,
    slug: string,
    enabled: boolean,
    priority: number,
    mapped: boolean,
    parent: null | number,
}

export interface IMerchant {
    id: number,
    name: string,
}
