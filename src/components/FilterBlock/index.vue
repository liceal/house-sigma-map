<template>
  <div class="container">
    <div
      v-for="(item, key) in items"
      :key="item.field || key"
      class="item"
      @click="toggle(item)"
    >
      <span class="text">{{ item.title }}</span>
      <i :class="iconClass(item)" class="icon"></i>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
export default {
  name: "FilterBlock",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    const isOpen = (item) => {
      return props.data[item.field] || false;
    };

    const iconClass = (item) => {
      return "iconfont " + (isOpen(item) ? "icon-shang" : "icon-xia");
    };

    const toggle = (item) => {
      const data = {
        field: item.field,
        item,
        data: props.data,
      };

      ctx.emit("toggle", data);
    };

    return {
      isOpen,
      toggle,
      iconClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 9px 16px;
  background-color: #28a3b3;
  .item {
    display: flex;
    align-items: center;
    border: 1px solid #ffffff;
    border-radius: 33px;
    padding: 5px 10px;
    .text {
      /* Subtitle 1 */

      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      /* identical to box height */

      display: flex;
      align-items: center;

      color: #ffffff;
    }
    .icon {
      color: #ffffff;
      opacity: 0.5;
      margin-left: 10px;
    }
  }
}
</style>
