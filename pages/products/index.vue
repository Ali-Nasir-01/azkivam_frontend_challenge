<template>
  <div>
    <products-table
      v-if="!loading"
      :items="products"
      :complete="complete"
      @load-more="fetchProducts"
    />
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
const complete = shallowRef<boolean>(false);

const fetchProducts = (firstInitial = false) => {
  if (firstInitial) loading.value = true;
  $axios
    .post(action, null, {
      params: { size, page: page.value },
    })
    .then(({ status, data }) => {
      if (data.data.length > 0) {
        products.value.push(...data.data);
        page.value += 1;
        complete.value = false;
      } else {
        complete.value = true;
      }
    })
    .catch((err) => {})
    .finally(() => {
      loading.value = false;
    });
};

onBeforeMount(() => {
  fetchProducts(true);
});
</script>
