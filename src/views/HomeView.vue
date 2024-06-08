<script setup>
import { onMounted, computed, reactive } from 'vue';
import { useInfoStore } from '@/stores/info';

const store = useInfoStore()
const state = reactive({
  isLoading: false,
})

const info = computed(() => {
  let userInfo = { fullname: '', age: 0 };

  if (store && store.info) {
    userInfo = {
      ...store.info,
      fullname: `${store.info.name} ${store.info.surname}`,
      age: new Date().getFullYear() - store.info.yearOfBirth,
    };
  }

  return userInfo;
})

onMounted(async () => {
  console.log('HomeView mounted')
  state.isLoading = true
  await store.fetchInfo()
  state.isLoading = false
})
</script>

<template>
  <div class="h-screen bg-indigo-800 text-white flex items-center justify-center ">
    <div v-if="state.isLoading" class="flex items-center">
      <div class="animate-ping rounded-full h-4 w-4 bg-white mr-4" />
      Loading...
    </div>

    <div v-else class="basis-auto">
      <div class="flex flex-wrap text-4xl font-bold items-center">
        <div class="basis-full md:basis-auto basis- pr-2">
          <div class="flex justify-center">
            <img src="https://omergokalp.netlify.app/foto/pp2.jpg" class="rounded-full w-64">
          </div>
        </div>

        <div class="basis-full mt-4 md:mt-0 md:basis-auto text-2xl">
          <div class="flex justify-center">
            {{ info.fullname }}
          </div>

          <div class="flex justify-center">
            Age: {{ info.age }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
