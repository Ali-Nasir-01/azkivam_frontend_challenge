export default function useMerchants() {
    const route = useRoute();

    const merchants = computed(() => {
        let result = null;
        if (route.query?.merchantIds) {
            result = (<string>route.query.merchantIds).split(",");
            result = result.map(item => Number(item));
        }
        return result;
    });

    return {
        merchants
    }
}