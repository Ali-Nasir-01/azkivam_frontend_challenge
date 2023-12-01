<template>
  <div class="container mx-auto mt-16 mb-10">
    <div class="grid grid-flow-col grid-col-12 gap-4">
      <div class="col-span-2">
        <filter-bar class="sticky top-5" />
      </div>
      <div class="col-span-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterBar from "~/components/products/FilterBar.vue";
</script>
