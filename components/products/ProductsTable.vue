<template>
  <div class="products-parent">
    <div class="grid grid-cols-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="col-span-1 product"
      >
        <!-- Image -->
        <div class="parent-image">
          <NuxtImg
            :src="item.imageUrl"
            class="image"
            placeholder
            format="webp"
            loading="lazy"
          />
        </div>
        <!-- Content -->
        <div class="mt-5 px-5">
          <div class="product-name">
            {{ item.name }}
          </div>
          <div class="mt-7">
            <span class="text-gray-600 text-sm">شروع قیمت از</span>
            <div class="flex mt-2 h-[30px] items-center">
              <div class="font-bold text-xl">
                {{ formatter.format(item.minPrice) }}
              </div>
              <div class="font-bold text-xs mr-2 self-start">تومان</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "@/types";

interface IProps {
  items: IProduct[];
}

defineProps<IProps>();
</script>

<style scoped lang="scss">
.products-parent {
  border-top: solid $grey-color 2px;
  border-right: solid $grey-color 2px;
  border-radius: 12px;

  .product {
    height: 380px;
    border: solid $grey-color 2px;
    border-top: none;
    border-right: none;

    .parent-image {
      width: 100%;
      height: 180px;
      margin-top: 30px;

      .image {
        height: 100%;
        margin: 0 auto;
      }
    }

    .product-name {
      font-size: 14px;
      font-weight: 400;
      height: 40px;
    }
  }
}
</style>
