<template>
  <div id="container">
    <span id="filters-title"> فیلترها </span>
    <div class="list">
      <span class="title">دسته‌بندی‌ها</span>
      <ul>
        <li v-for="(category, index) in categories" :key="index">
          <span>
            {{ category.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  margin-top: 1.5rem;

  .title {
    font-size: 1rem;
    font-weight: 600;
  }

  ul {
    margin-top: 0.5rem;
    span {
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}
</style>
