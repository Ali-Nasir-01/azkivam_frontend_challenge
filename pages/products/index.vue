<template>
  <div>products</div>
</template>

<script setup lang="ts">
const { $axios } = useNuxtApp();
const appConfig = useAppConfig();
const action = appConfig.endpoints.PRODUCTS;
const size: number = 10;
const page = shallowRef<number>(1);

const fetchProducts = () => {
  $axios
    .post(action, null, {
      params: { size, page: page.value },
    })
    .then(({ status, data }) => {})
    .catch((err) => {})
    .finally(() => {});
};

onBeforeMount(() => {
  fetchProducts();
});
</script>
