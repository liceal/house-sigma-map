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

import { computed, ref, inject, reactive } from "vue";
export default {
  name: "MyHeader",
  components: {
    SearchInput,
    FilterBlock,
    Popup,
  },
  setup(props, ctx) {
    const searchValue = inject("searchValue");
    const filterBlockAttrs = inject("filterBlock");
    const back = () => {
      this.$emit("back");
    };

    let filterBlockActiveField = null;
    const filterBlockMehotds = {
      toggle: ({ field, data, item }) => {
        data[field] = !data[field];
        filterBlockActiveField = field;
        if (data[field]) {
          popupAttrs.value = item.popup;
          popupAttrs.value.visible = true;
        }
      },
    };

    const popupAttrs = ref({}); //弹出框属性

    const popupMethods = {
      //弹出框事件
      close: () => {
        filterBlockAttrs.data[filterBlockActiveField] = false;
        popupAttrs.value.visible = false;
      },
      apply: ({ value, data }) => {
        Reflect.ownKeys(value).forEach((k) => {
          data[k] = value[k];
        });
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
