<template>
  <div class="checkbox">
    <span
      v-for="(item, key) in items"
      :key="item.value || key"
      class="item"
      :class="isActive(item) ? 'active-item' : ''"
      @click="toggle(item)"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<script>
import { unref, ref, effect } from "vue";
export default {
  name: "CheckBox",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    data: {
      type: [Array, String],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const activeMap = ref();
    let active = ref();
    effect(() => {
      // 源数据改变时初始值
      activeMap.value = new Set();
      if (props.multiple) {
        props.data?.forEach((item) => {
          activeMap.value.add(item);
        });
      } else {
        active.value = props.data ? unref(props.data) : "";
      }
    });

    const toggle = (item) => {
      if (props.multiple) {
        if (activeMap.value.has(item.value)) {
          activeMap.value.delete(item.value);
        } else {
          activeMap.value.add(item.value);
        }
        ctx.emit("change", [...activeMap.value]);
      } else {
        active.value = active.value === item.value ? "" : item.value;
        ctx.emit("change", active.value);
      }
    };
    const isActive = (item) => {
      if (props.multiple) {
        return activeMap.value.has(item.value);
      } else {
        return active.value === item.value;
      }
    };
    return { toggle, isActive };
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  padding: 16px 0px;
  overflow: auto;
  .item {
    width: 10;
    height: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 7px 10px;
    gap: 10px;
  }
  .item + .item {
    margin-left: 20px;
  }
  .active-item {
    background: #28a3b3;
    color: #fff;
  }
}
</style>
