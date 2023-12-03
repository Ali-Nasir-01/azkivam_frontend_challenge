<template>
  <div>
    <div class="search-container">
      <input
        v-model="search"
        class="search-input"
        type="text"
        placeholder="جستجو"
      />
      <Icon class="search-icon" icon="mdi:search" />
    </div>
    <div id="merchant-container">
      <div
        v-for="(item, index) in showMerchants"
        :key="index"
        class="flex items-center my-2"
      >
        <input
          v-model="selectedMerchants"
          :id="`id-${item.id}`"
          :value="item.id"
          type="checkbox"
          class="accent-blue-600 w-[15px] h-[15px] rounded-2xl"
        />
        <label :for="`id-${item.id}`" class="font-regular mr-2 cursor-pointer">
          {{ item.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMerchant } from "@/types/apis";
import { Icon } from "@iconify/vue";

const { $fetch } = useNuxtApp();
const appConfig = useAppConfig();
const router = useRouter();
const action = appConfig.endpoints.MERCHANTS;
const merchants = ref<IMerchant[]>([]);
const selectedMerchants = ref<number[]>([]);
const search = ref<string>("");

const showMerchants = computed<IMerchant[]>(() => {
  if (!search.value) return merchants.value;

  return merchants.value.filter((item) => item.name.includes(search.value));
});

const { data, error } = await useAsyncData("merchants", () => $fetch(action));

const updateUrl = () => {
  let query = {};
  if (selectedMerchants.value.length > 0) {
    query = {
      merchantIds: selectedMerchants.value.join(","),
    };
  }
  window.scrollTo(0, 0);
  router.replace({
    query,
  });
};

onBeforeMount(() => {
  merchants.value = data.value.data;
});

watch(selectedMerchants, () => {
  updateUrl();
});
</script>

<style scoped lang="scss">
.search-container {
  position: relative;

  .search-icon {
    position: absolute;
    top: 11px;
    left: 12px;
    font-size: 20px;
    color: #999;
  }

  .search-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    border-radius: 7px;
    padding: 8px 10px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: unset;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 0.1rem solid #bbc1e1;
    background: #fff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;

    &:hover {
      border-color: $grey-color;
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(178, 179, 181, 0.3);
      border-color: $grey-color;
    }

    &:disabled {
      background: #f6f8ff;
      cursor: not-allowed;
      opacity: 0.9;
      border-color: #bbc1e1;
    }
  }
}

#merchant-container {
  margin-top: 10px;
  max-height: 125px;
  overflow-y: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #b9b9b9;
    border-radius: 5px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
