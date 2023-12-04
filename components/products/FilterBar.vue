<template>
  <div id="container">
    <div class="flex">
      <span id="filters-title"> فیلترها </span>
      <span
        v-if="isFiltered"
        class="text-blue-800 text-sm cursor-pointer mr-auto"
        @click="$router.push('/products')"
        >حذف فیلتر</span
      >
    </div>
    <div class="list">
      <div class="flex">
        <span class="title">دسته‌بندی‌ها</span>
        <Icon
          v-if="smAndDown"
          class="md:hidden text-3xl text-gray-600 mr-auto"
          :icon="openCategoryFilter ? 'mdi:chevron-down' : 'mdi:chevron-up'"
          @click="openCategoryFilter = !openCategoryFilter"
        />
      </div>
      <div v-if="!smAndDown || openCategoryFilter" class="mt-4">
        <div v-for="(category, index) in categories" :key="index" class="my-3">
          <div class="parent-category">
            <span @click="selectCategory(category)">
              {{ category.name }}
            </span>
            <Icon
              class="icon text-gray-600"
              :icon="category.open ? 'mdi:chevron-down' : 'mdi:chevron-up'"
              @click="category.open = !category.open"
            />
          </div>
          <ul v-if="category.open" class="px-3 child-categories">
            <li
              v-for="(child, childIndex) in category.children"
              :key="childIndex"
              class="my-3 text-gray-900"
            >
              <span @click="selectCategory(child)">
                {{ child.name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <hr class="my-5" />
      <span class="title"> فروشگاه‌ها </span>
      <merchants-list class="mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MerchantsList from "~/components/products/MerchantsList";
import { Icon } from "@iconify/vue";
import type { Category } from "@/types/apis";
import type { CategoryList } from "@/types";

const { $fetch } = useNuxtApp();
const appConfig = useAppConfig();
const { smAndDown } = useDisplay();
const router = useRouter();
const route = useRoute();
const action = appConfig.endpoints.CATEGORIES;
const categories = ref<CategoryList[]>([]);
const openCategoryFilter = ref<boolean>(false);

const isFiltered = computed<boolean>(() => (route.params?.id ? true : false));

const { data } = await useAsyncData("categories", () => $fetch(action));

const fillData = (data: Category[]) => {
  // Sort categories based on priority
  const sortedCategories = data.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  // Find Parent Categories
  let parentIndex: null | number = null;
  do {
    parentIndex = sortedCategories.findIndex((item) => item.parent === null);
    if (parentIndex !== -1) {
      categories.value.push({
        ...sortedCategories[parentIndex],
        open: true,
        children: [],
      });
      sortedCategories.splice(parentIndex, 1);
    }
  } while (parentIndex !== -1);

  // Asign childs to parents
  for (const category of sortedCategories) {
    const parentId = category.parent;
    const parent = categories.value.find((item) => item.id === parentId);
    parent?.children.push(category);
  }
};

const selectCategory = (category: Category | CategoryList) => {
  router.push(`/products/${category.id}/${category.slug}`);
};

onBeforeMount(() => {
  fillData(data.value.data);
});

watch(smAndDown, () => {
  openCategoryFilter.value = false;
});
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  border-radius: 12px;
  border: solid $grey-color 2px;
  padding: 12px 8px;
}

#filters-title {
  font-weight: 600;
  font-size: 1.2rem;
}

.list {
  margin-top: 1.2rem;
  user-select: none;

  .title {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .parent-category {
    display: flex;
    align-items: center;

    span {
      margin-left: 8px;
      font-weight: 400;
      font-size: 1rem;

      &:hover {
        cursor: pointer;
      }
    }

    .icon {
      font-size: 25px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .child-categories {
    font-weight: 300;
    font-size: 1rem;

    span {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
