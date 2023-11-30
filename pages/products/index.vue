<template>
  <div>
    <products-table :items="products" />
  </div>
</template>

<script setup lang="ts">
import ProductsTable from "@/components/products/ProductsTable";
import type { IProduct } from "@/types";

const { $axios } = useNuxtApp();
const appConfig = useAppConfig();
const action = appConfig.endpoints.PRODUCTS;
const size: number = 12;
const page = shallowRef<number>(1);
const products = ref<IProduct[]>([]);

const fetchProducts = () => {
  $axios
    .post(action, null, {
      params: { size, page: page.value },
    })
    .then(({ status, data }) => {
      products.value.push(...data.data);
      console.log(products);
    })
    .catch((err) => {})
    .finally(() => {});
};

onBeforeMount(() => {
  fetchProducts();
});
</script>
