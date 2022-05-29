// store.js
import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const mapStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "map",
  // state: 返回对象的函数
  state: () => ({
    filterMap: {},
  }),
  actions: {
    setFilterPopupMap(key: string, value: any) {
      Reflect.set(this.filterMap, key, value);
      localStorage.setItem(
        `house-sigma-filterMap-${key}`,
        JSON.stringify(value)
      );
    },
    getFilterPopupMap(key: string) {
      const res = Reflect.get(this.filterMap, key);
      if (!res) {
        const localRes = localStorage.getItem(`house-sigma-filterMap-${key}`);
        let localResJSON;
        if (localRes && typeof localRes === "string") {
          localResJSON = JSON.parse(localRes);
          Reflect.set(this.filterMap, key, localResJSON);
        }
        return localResJSON;
      }
      return res;
    },
    delFilterPopupMap(key: string) {
      Reflect.deleteProperty(this.filterMap, key);
      localStorage.removeItem(`house-sigma-filterMap-${key}`);
    },
  },
});
