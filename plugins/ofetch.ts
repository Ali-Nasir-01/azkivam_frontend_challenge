export default defineNuxtPlugin(({$config}) => {
    const fetchInstanse = $fetch.create({
        baseURL: `${$config.public.baseUrl}${$config.public.prefix}`
    });

    return {
        provide:{
            fetch: fetchInstanse
        }
    }
})