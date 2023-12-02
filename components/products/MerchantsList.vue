<template>
  <div id="merchant-container">
    <div
      v-for="(item, index) in merchants"
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
</template>

<script setup lang="ts">
import type { IMerchant } from "@/types/apis";

const { $axios } = useNuxtApp();
const appConfig = useAppConfig();
const router = useRouter();
const action = appConfig.endpoints.MERCHANTS;
const merchants = ref<IMerchant[]>();
const selectedMerchants = ref<number[]>([]);

const fetchMerchants = () => {
  $axios
    .get(action)
    .then(({ status, data }) => {
      merchants.value = data.data;
    })
    .catch((err) => {})
    .finally(() => {});
};

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
  fetchMerchants();
});

watch(selectedMerchants, () => {
  updateUrl();
});
</script>

<style scoped lang="scss">
#merchant-container {
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
