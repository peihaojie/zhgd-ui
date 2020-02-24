<template>
  <div>
    <div class="box" :style="{height: height}">
      <div class="line top-left"></div>
      <div class="height top-left-height"></div>
      <div class="line top-right"></div>
      <div class="height top-right-height"></div>
      <div class="line bottom-left"></div>
      <div class="height bottom-left-height"></div>
      <div class="line bottom-right"></div>
      <div class="height bottom-right-height"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin';
export default {
  mixins: [mixin],
  props:{
    height: {
      type: String,
      default: '2rem'
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {},
};
</script>

<style scoped lang="less">
.box {
  background: rgba(0, 22, 59, .3);
  width: 100%;
  border: 1px solid #012a6b;
  border-image: linear-gradient(to right, #012a6b, #4c79b0, #012a6b);
  border-image-slice: 10;
  position: relative;
  color: #fff;
  .line {
    width: .1rem;
    height: 1px;
    background: #0068ff;
    position: absolute;
  }
  .height {
    width: 1px;
    height: .1rem;
    background: #0068ff;
    position: absolute;
  }
  .top-left {
    top: -1px;
    left: 0;
  }
  .top-right {
    top: -1px;
    right: 0;
  }
  .bottom-left {
    bottom: -1px;
    left: 0;
  }
  .bottom-right {
    bottom: -1px;
    right: 0;
  }
  .top-left-height {
    top: 0;
    left: -1px;
  }
  .top-right-height {
    top: 0;
    right: -1px;
  }
  .bottom-left-height {
    bottom: 0;
    left: -1px;
  }
  .bottom-right-height {
    bottom: 0;
    right: -1px;
  }
}
</style>
