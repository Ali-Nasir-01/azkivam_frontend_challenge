<template>
  <div v-if="!loading">
    <div class="products-parent">
      <div
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
      >
        <div
          v-for="(item, index) in products"
          :key="index"
          class="col-span-1 product"
          :class="[
            (index + 1) % columnCount === 0 ? '' : 'border-left',
            haveBorderIndex >= index + 1 ? 'border-bottom' : '',
          ]"
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
    <div ref="el" class="mt-4">
      <circle-loading v-if="spinner && !complete" class="mx-auto" />
      <div v-else-if="complete" class="text-center text-gray-500">
        شما تمام محصولات را مشاهده کرده‌اید
      </div>
    </div>
  </div>
  <circle-loading class="mx-auto md:mt-10" v-else />
</template>

<script setup lang="ts">
import type { IProduct } from "@/types";

const { $axios } = useNuxtApp();
const { merchants } = useMerchants();
const { breakPoint } = useDisplay();
const appConfig = useAppConfig();
const products = ref<IProduct[]>([]);
const loading = shallowRef<boolean>(true);
const complete = shallowRef<boolean>(false);
const route = useRoute();

const productsAction = appConfig.endpoints.PRODUCTS;
const categoryProductsAction = appConfig.endpoints.CATEGORY_PRODUCTS;
const size: number = 12;
const page = shallowRef<number>(1);
const columnCount = shallowRef<number>(4);

// This computed return a number based on products length to items can have border-bottom or not
const haveBorderIndex = computed<number>(() => {
  const a = products.value.length / columnCount.value;
  if (Number.isInteger(a)) {
    return a * columnCount.value - columnCount.value;
  }

  return Math.floor(a) * columnCount.value;
});

const spinner = shallowRef<boolean>(false);
const el = ref<HTMLElement | null>(null);
const { stop } = useIntersectionObserver(
  el,
  ([{ isIntersecting }], observerElement) => {
    spinner.value = isIntersecting;
    if (isIntersecting) {
      fetchProducts();
    }
  }
);

const fetchProducts = (firstInitial = false) => {
  let action = productsAction;
  if (route.params?.id) {
    action = setApi(categoryProductsAction, <string>route.params.id);
  }
  if (firstInitial) loading.value = true;
  let body = null;
  if (merchants.value) {
    body = {
      merchantIds: merchants.value,
    };
  }
  $axios
    .post(action, body, {
      params: { size, page: page.value },
    })
    .then(({ status, data }) => {
      if (data.data.length > 0) {
        products.value.push(...data.data);
        page.value += 1;
        complete.value = false;
      } else {
        complete.value = true;
        stop();
      }
    })
    .catch((err) => {})
    .finally(() => {
      loading.value = false;
    });
};

const returnColumnsCount = () => {
  switch (breakPoint.value) {
    case "xs":
      return 1;
    case "sm":
      return 2;
    case "md":
      return 3;
    default:
      return 4;
  }
};

const updateColumnsCount = () => {
  columnCount.value = returnColumnsCount();
};

watch(merchants, () => {
  products.value = [];
  page.value = 1;
  fetchProducts(true);
});

onBeforeMount(() => {
  fetchProducts(true);
});

watch(
  breakPoint,
  () => {
    updateColumnsCount();
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.products-parent {
  border: solid $grey-color 2px;
  border-radius: 12px;

  .border-bottom {
    border-bottom: solid 2px $grey-color;
  }

  .border-left {
    border-left: solid 2px $grey-color;
  }

  .product {
    height: 380px;

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
      text-overflow: ellipsis;
      overflow-y: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
