<!--
 * @Date         : 2020-02-24 16:35:32
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-25 17:14:31
 * @FilePath     : \src\base\tabs.vue
 * @描述          : tab的弹出框
 * @用法          : wrap需添加position：relative定位，hover之后通过display控制显示
 * @参数          : data [{name: "显示的名称", url: "router.path"}]
 * @参数          : position (center/top/bottom)
 -->
<template>
  <div :class="position == 'center' ? 'center' : position == 'top' ? 'top' : 'bottom'">
    <div class="block"></div>
    <ul class="list-warp">
      <li class="list" v-for="item in data" :key="item.url">
        <router-link :to="item.url">
          {{item.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    position: {
      type: String,
      default: "center"
    }
  },
  data() {
    return {}
  },
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.center {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.75rem;
  width: 2rem;
  .block {
    width: 0.25rem;
    height: 0.25rem;
    background-color: #1872ad;
    position: absolute;
    top: 50%;
    left: -.1rem;
    transform: translateY(-50%)rotate(45deg);
  }
  .list-warp {
    padding: .05rem;
    background-color: #1872ad;
    width: auto !important;
    .list {
      font-size: .18rem;
      color: #fff;
      height: .36rem !important;
      margin-bottom: .05rem;
      &:hover {
        background-color: #54a4d7!important;
      }
      &:last-child {
        margin-bottom: 0;
      }
      a {
        border-bottom: none !important;
        padding-left: .18rem !important;
        height: .36rem !important;
        line-height: .36rem !important;
        &:hover {
          background-color: #54a4d7!important;
        }
      }
    }
  }
}
.top {
  position: absolute;
  top: 0;
  left: 1.75rem;
  width: 2rem;
  .block {
    width: 0.25rem;
    height: 0.25rem;
    background-color: #1872ad;
    position: absolute;
    top: .3rem;
    left: -.1rem;
    transform: translateY(-50%)rotate(45deg);
  }
  .list-warp {
    padding: .05rem;
    background-color: #1872ad;
    width: auto !important;
    .list {
      font-size: .18rem;
      color: #fff;
      height: .36rem !important;
      &:hover {
        background-color: #54a4d7!important;
      }
      &:last-child {
        margin-bottom: 0;
      }
      a {
        border-bottom: none !important;
        padding-left: .18rem !important;
        height: .36rem !important;
        line-height: .36rem !important;
        &:hover {
          background-color: #54a4d7!important;
        }
      }
    }
  }
}
.bottom {
  position: absolute;
  bottom: 0%;
  left: 1.75rem;
  width: 2rem;
  .block {
    width: 0.25rem;
    height: 0.25rem;
    background-color: #1872ad;
    position: absolute;
    bottom: .3rem;
    left: -.1rem;
    transform: translateY(50%)rotate(45deg);
  }
  .list-warp {
    padding: .05rem;
    background-color: #1872ad;
    width: auto !important;
    .list {
      font-size: .18rem;
      color: #fff;
      height: .36rem !important;
      &:hover {
        background-color: #54a4d7!important;
      }
      &:last-child {
        margin-bottom: 0;
      }
      a {
        border-bottom: none !important;
        padding-left: .18rem !important;
        height: .36rem !important;
        line-height: .36rem !important;
        &:hover {
          background-color: #54a4d7!important;
        }
      }
    }
  }
}
</style>