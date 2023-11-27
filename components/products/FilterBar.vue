<template>
  <div id="container">
    <span id="filters-title"> فیلترها </span>
    <div class="list">
      <span class="title">دسته‌بندی‌ها</span>
      <div class="mt-4">
        <div v-for="(category, index) in categories" :key="index" class="my-3">
          <div class="parent-category">
            <span>
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
              <span>
                {{ child.name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Category } from "@/types/apis";
import type { CategoryList } from "@/types";

const { $axios } = useNuxtApp();
const appConfig = useAppConfig();
const action = appConfig.endpoints.CATEGORIES;
const categories = ref<CategoryList[]>([]);

const fetchCategories = () => {
  $axios
    .get(action)
    .then(({ status, data }) => {
      fillData(data.data);
    })
    .catch((err) => {})
    .finally(() => {});
};

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

onBeforeMount(() => {
  fetchCategories();
});
</script>

<style scoped lang="scss">
#container {
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
