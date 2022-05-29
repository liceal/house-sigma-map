<template>
  <div class="map-header">
    <strong class="iconfont icon-Left" @click="back" />
    <SearchInput
      v-model:value="searchValue"
      @enter="searchInputEnter"
      clearable
    />
    <strong class="watch">
      <i class="iconfont icon-dingwei" />
      <span>Watch</span>
    </strong>
  </div>
  <FilterBlock v-bind="filterBlockAttrs" v-on="filterBlockMehotds" />
  <Popup v-bind="popupAttrs" v-on="popupMethods" />
</template>

<script>
import SearchInput from "@/components/SearchInput/index.vue";
import FilterBlock from "@/components/FilterBlock/index.vue";
import Popup from "@/components/Popup/index.vue";
import { mapStore } from "@/store/map";

import { computed, ref, inject, reactive, effect, watch } from "vue";
import { cloneDeep } from "@/utils";
export default {
  name: "MyHeader",
  components: {
    SearchInput,
    FilterBlock,
    Popup,
  },
  setup(props, ctx) {
    const searchValue = ref("");
    const filterBlockAttrs = ref({});
    effect(() => {
      searchValue.value = inject("searchValue");
      filterBlockAttrs.value = inject("filterBlock");
    });

    const maper = mapStore();
    filterBlockAttrs.value.items.forEach((filter) => {
      //将用到的filters依赖进行同步
      if (!maper.getFilterPopupMap(filter.popup.id)) {
        //如果没有值将使用默认值
        maper.setFilterPopupMap(filter.popup.id, filter.popup.data);
      }
    });

    const defaultPopupDataMap = new Map(); //存储popup默认值

    const back = () => {
      ctx.emit("back");
    };

    let activeFilterBlockField;
    const filterBlockMehotds = {
      toggle: ({ field, data, item }) => {
        data[field] = !data[field];
        activeFilterBlockField = field;
        if (data[field]) {
          //首次进入到时候备份初始数据
          if (!defaultPopupDataMap.get(item.popup.id)) {
            defaultPopupDataMap.set(item.popup.id, cloneDeep(item.popup.data));
          }
          item.popup.data =
            maper.getFilterPopupMap(item.popup.id) || item.popup.data;
          popupAttrs.value = item.popup;
          popupAttrs.value.visible = true;
        }
      },
    };

    const popupAttrs = ref({}); //弹出框属性

    const popupMethods = {
      //弹出框事件
      close: () => {
        filterBlockAttrs.value.data[activeFilterBlockField] = false;
        popupAttrs.value.visible = false;
      },
      apply: ({ value, data }) => {
        Reflect.ownKeys(value).forEach((k) => {
          data[k] = value[k];
        });
        maper.setFilterPopupMap(popupAttrs.value.id, cloneDeep(data));
        ctx.emit("filterApply", data);
        popupMethods.close();
      },
      /**
       * 清除数据，恢复默认值，清除缓存，关闭弹窗
       */
      clear: ({ data }) => {
        const defaultPopupData = defaultPopupDataMap.get(popupAttrs.value.id);
        console.log("clear", data, defaultPopupData);
        Reflect.ownKeys(defaultPopupData).forEach((k) => {
          data[k] = defaultPopupData[k];
        });
        maper.delFilterPopupMap(popupAttrs.value.id);
        popupMethods.close();
      },
    };

    const searchInputEnter = (val) => {
      //input回车事件
      ctx.emit("searchEnter", val);
    };

    return {
      searchValue,
      filterBlockAttrs,
      filterBlockMehotds,
      popupAttrs,
      popupMethods,
      back,
      searchInputEnter,
    };
  },
};
</script>

<style lang="scss" scoped>
.map-header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28a3b3;
  color: white;
  padding-top: 9px;
  strong {
    margin: 8px 0;
  }
  .watch {
    margin: 0 16px;
    span {
      margin-left: 10px;
    }
  }
}
</style>
