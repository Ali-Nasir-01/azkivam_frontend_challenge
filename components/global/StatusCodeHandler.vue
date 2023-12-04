<template>
  <div class="text-lg text-gray-600 text-center">
    <span v-if="noResult"> نتیجه‌ای یافت نشد. </span>
    <span v-else-if="error"> خطایی رخ داده است. لطفا مجددا تلاش کنید </span>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  error: boolean;
  noResult: boolean;
}

defineProps<IProps>();
</script>
