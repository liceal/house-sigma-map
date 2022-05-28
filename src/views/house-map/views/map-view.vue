<template>
  <div>map</div>
</template>

<script>
import { useStore } from "@/store/map";
export default {
  name: "MapView",
  setup(props, ctx) {
    // 调用函数 获得Store
    const store = useStore();
    console.log(ctx);
  },
};
</script>

<style></style>
