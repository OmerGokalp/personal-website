import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', () => {
  let info = ref(null);

  async function fetchInfo() {
    const { default: data } = await import('../data/info.json');

    info.value = data.info;
  }

  return { info, fetchInfo }
})
