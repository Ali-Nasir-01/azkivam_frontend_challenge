export const formatter = new Intl.NumberFormat();

export const setApi = (api: string, pageId: string) => {
    return api.replace(/{[^}]*}/g, pageId);
};