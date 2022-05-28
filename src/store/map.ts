// store.js
import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "map",
  // state: 返回对象的函数
  state: () => ({
    filters: {},
    localStorageMap: {
      filters: "house-sigma-map-filters",
    },
  }),
  actions: {
    setFilters(filters: any) {
      this.filters = filters;
      localStorage.setItem(
        this.localStorageMap.filters,
        JSON.stringify(filters)
      );
    },
    getLocalStorageFilters() {
      if (
        !Reflect.ownKeys(this.filters).length &&
        localStorage.getItem(this.localStorageMap.filters)
      ) {
        this.filters = localStorage.getItem(this.localStorageMap.filters) || {};
      }

      const filters = localStorage.getItem(this.localStorageMap.filters);
      if (filters && typeof filters === "string") {
        return JSON.parse(filters);
      }
      return {};
    },
  },
});
