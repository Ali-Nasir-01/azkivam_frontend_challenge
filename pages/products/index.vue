<template>
  <div>
    <products-table v-if="!loading" :items="products" />
    <circle-loading v-else />
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "@/types";

const { $axios } = useNuxtApp();
const appConfig = useAppConfig();
const action = appConfig.endpoints.PRODUCTS;
const size: number = 12;
const page = shallowRef<number>(1);
const products = ref<IProduct[]>([]);
const loading = shallowRef<boolean>(true);

const fetchProducts = () => {
  loading.value = true;
  $axios
    .post(action, null, {
      params: { size, page: page.value },
    })
    .then(({ status, data }) => {
      products.value.push(...data.data);
      console.log(products);
    })
    .catch((err) => {})
    .finally(() => {
      loading.value = false;
    });
};

onBeforeMount(() => {
  fetchProducts();
});
</script>
