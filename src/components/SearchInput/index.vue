<template>
  <div class="search-input">
    <strong class="prefix" :class="prefixClass" />
    <input v-model="inputValue" @input="input" @keydown.enter="enter" />

    <span v-if="clearable" class="suffix">
      <i class="iconfont icon-cha" @click="clear" />
    </span>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "SearchInput",
  props: {
    prefix: {
      type: String,
      default: "icon-search",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const inputValue = ref(props.value);

    const input = (e) => {
      ctx.emit("update:value", e.target.value);
    };

    const prefixClass = computed(() => {
      return props.prefix ? `iconfont ${props.prefix}` : "";
    });

    const clear = () => {
      inputValue.value = "";
      ctx.emit("update:value", "");
      ctx.emit("clear");
    };

    const enter = () => {
      ctx.emit("enter", inputValue.value);
    };
    return {
      inputValue,
      input,
      prefixClass,
      enter,
      clear,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  position: relative;
  .prefix {
    position: absolute;
    top: 7px;
    left: 7px;
  }
  input {
    padding: 8px 42px;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    outline: none;
    border-radius: 10px;
    color: white;
  }
  .suffix {
    position: absolute;
    right: 7px;
    top: 4px;
  }
}
</style>
