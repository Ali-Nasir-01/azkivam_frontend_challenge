<template>
  <div>تست</div>
</template>

<script setup lang="ts">
const { $axios } = useNuxtApp();

onMounted(() => {
  console.log("$axios", $axios);
  $axios.get("/categories");
});
</script>
