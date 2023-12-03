<template>
  <div class="container mx-auto mt-12 mb-10">
    <div class="grid grid-flow-col grid-col-2 gap-4">
      <div class="md:w-[250px]">
        <filter-bar />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterBar from "~/components/products/FilterBar.vue";
</script>
