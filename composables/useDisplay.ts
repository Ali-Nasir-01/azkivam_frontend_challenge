export default function useDisplay() {

    const breakPoint = ref<null | string>(null);

    const updateBreakpoint = () => {
        if (window.matchMedia('(min-width: 1536px)').matches) {
            breakPoint.value = '2xl';
        } else if (window.matchMedia('(min-width: 1280px)').matches) {
            breakPoint.value = 'xl';
        } else if (window.matchMedia('(min-width: 1024px)').matches) {
            breakPoint.value = 'lg';
        } else if (window.matchMedia('(min-width: 768px)').matches) {
            breakPoint.value = 'md';
        } else if (window.matchMedia('(min-width: 640px)').matches) {
            breakPoint.value = 'sm';
        } else {
            breakPoint.value = 'xs';
        }
    };

    const smAndDown = computed(() => breakPoint.value === 'sm' || breakPoint.value === 'xs');

    onMounted(() => {
        window.addEventListener('resize', updateBreakpoint);

        updateBreakpoint();
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateBreakpoint);
    })

    return {breakPoint, smAndDown}
}