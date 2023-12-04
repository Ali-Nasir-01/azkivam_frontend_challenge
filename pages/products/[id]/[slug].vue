<template>
  <div>
    <products-table />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

useHead({
  title: <string>route.params.slug,
});
</script>
