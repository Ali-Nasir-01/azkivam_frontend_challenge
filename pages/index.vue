<template>
  <div></div>
</template>

<script setup lang="ts">
const { $axios } = useNuxtApp();

onMounted(() => {
  console.log("$axios", $axios);
  $axios.get("/categories");
});
</script>

<style scoped lang="scss"></style>
