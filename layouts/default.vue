<template>
  <div class="container mx-auto mt-12 mb-10">
    <div class="md:flex md:gap-4">
      <div class="md:w-[300px] w-full">
        <filter-bar />
      </div>
      <div class="mt-5 md:mt-0 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterBar from "~/components/products/FilterBar.vue";
</script>
