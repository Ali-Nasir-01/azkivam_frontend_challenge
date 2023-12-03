export default defineAppConfig({
    endpoints: {
        CATEGORIES: "/categories",
        MERCHANTS: "/merchants",
        PRODUCTS: "/products", // POST
        CATEGORY_PRODUCTS: "/products/{categoryId}", // POST
    },
});
