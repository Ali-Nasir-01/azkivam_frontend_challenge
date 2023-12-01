export default defineNuxtPlugin(() => {
    addRouteMiddleware('redirect', (to, from) => {
        const url = to.path.split('/');
        if (url[1] !== 'products') {
            return navigateTo("/products");
        }
}, { global: true });
})