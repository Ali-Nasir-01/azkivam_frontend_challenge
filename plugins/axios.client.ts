import axios from "axios";
export default defineNuxtPlugin(({$config}) => {
    const axiosInstance = axios.create({
        proxy: false,
        debug: false,
        credentials: true,
        baseURL: $config.public.prefix,
        withCredentials: true,
        retry: {
            retries: 3,
            retryDelay: (retryCount: number) => {
                return retryCount * 1000;
            },
        },
    });

    return {
        provide: {
            axios: axiosInstance,
        },
    };
});
