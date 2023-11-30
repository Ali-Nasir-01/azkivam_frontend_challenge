<template>
  <div class="container mx-auto mt-16">
    <div class="grid grid-flow-col grid-col-12 gap-4">
      <filter-bar />
      <div class="col-span-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterBar from "~/components/products/FilterBar.vue";
</script>
