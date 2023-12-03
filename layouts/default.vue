<template>
  <div class="container mx-auto mt-12 mb-10">
    <div class="flex gap-4">
      <div class="md:w-[250px]">
        <filter-bar />
      </div>
      <div class="w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterBar from "~/components/products/FilterBar.vue";
</script>
