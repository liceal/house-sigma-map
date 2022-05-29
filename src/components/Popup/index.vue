<template>
  <div class="popup" v-show="visible">
    <div class="mask" @click="close" />
    <transition name="popup">
      <div class="container" v-if="visible">
        <div class="title">{{ title }}</div>
        <div class="content">
          <div
            class="line"
            v-for="(item, key) in items"
            :key="item.field || key"
          >
            <strong>{{ item.title }}</strong>
            <div v-if="renderType(item) === 'checkbox'">
              <CheckBox
                :items="renderProps(item).options"
                :multiple="renderProps(item).multiple"
                :data="_data[item.field]"
                @change="checkBoxChange($event, _data, item.field)"
              />
            </div>
            <hr />
          </div>
        </div>
        <div class="handler">
          <slot name="footer">
            <strong @click="clear">Clear</strong>
            <strong @click="apply">Apply</strong>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CheckBox from "@/components/CheckBox/index.vue";
import { toRefs, ref, unref, effect } from "vue";
export default {
  name: "PopUp",
  components: {
    CheckBox,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
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
    let _data = ref();
    effect(() => {
      _data.value = JSON.parse(JSON.stringify(props.data));
    });
    const close = () => {
      ctx.emit("close", props);
    };
    const clear = () => {
      ctx.emit("clear", props);
    };
    const apply = () => {
      // console.log(_data);
      const data = {
        value: _data.value,
        ...props,
      };
      ctx.emit("apply", data);
    };
    const renderType = (item) => {
      return item?.itemRender?.name;
    };
    const renderProps = (item) => {
      return item?.itemRender?.props;
    };

    const checkBoxChange = (val, data, field) => {
      data[field] = val;
      // console.log(val, data, field);
      // console.log(_data);
    };
    return {
      _data,
      close,
      clear,
      apply,
      renderType,
      renderProps,
      checkBoxChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    opacity: 0.7;
  }
  .container {
    position: fixed;
    box-sizing: border-box;
    bottom: 0px;
    height: 80%;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(27.1828px);
    border-radius: 20px 20px 0px 0px;
    padding: 0px 16px;
    // padding-top: 30px;
    .title {
      padding: 30px 0px;
      /* H1 header */

      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
      text-align: center;
      /* identical to box height */
    }
    .content {
      height: calc(100% - 170px);
      overflow: auto;
      padding-bottom: 30px;
      box-sizing: border-box;
      .line {
        hr {
          border: 1px solid #e2e2e2;
        }
      }
    }
  }
  .handler {
    position: fixed;
    height: 136px;
    width: 100vw;
    left: 0px;
    bottom: 0px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.0001) 0%,
      #ffffff 27.77%
    );
    display: flex;
    justify-content: right;
    align-items: center;
    strong {
      margin-right: 30px;
      color: #28a3b3;
    }
  }
}
.popup-enter-active {
  animation: popup-in 0.3s;
}
.popup-leave-active {
  animation: popup-in 0.3s reverse;
}
@keyframes popup-in {
  0% {
    height: 0px;
  }
  100% {
    height: 80%;
  }
}
</style>
