<!--
 * @Date         : 2020-02-28 16:39:54
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-02-28 20:37:46
 * @FilePath     : /src/components/system/systemSet/systemSet_epidemic/setting_age.vue
 -->
<template>
  <div>
    <div class="center">
      <div class="title">
        <i class="el-icon-arrow-left" @click="back"></i>
        年龄设置
      </div>
      <div class="tabs">
        <div class="tab active">年龄设置</div>
      </div>
      <div class="button">
        <span class="btn">
          <i class="el-icon-circle-plus-outline"></i>
          设定录入年龄
        </span>
      </div>
      <div class="list">
        <div class="item" v-for="item in list" :key="item.age">
          设定年龄：{{item.age}}
          <div class="switch">
            <span v-if="item.enter">禁止入内</span>
            <el-switch v-model="item.enter" active-color="#ff4949" inactive-color="#0090ff"></el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          age: 25,
          enter: true
        }
      ]
    }
  },
  components: {},
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
@bc:#c5e8ff;
@text: #0090ff;
.center {
  box-shadow: 0 0 0.5rem -0.3rem #666;
  height: 9.5rem;
  border-radius: 0.04rem;
  padding: 0 .2rem;
  .title {
    text-align: center;
    font-size: .24rem;
    line-height: .7rem;
    border-bottom: 0.01rem solid @bc;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      font-size: .3rem;
      color: @text;
      cursor: pointer;
    }
  }
  .tabs {
    height: .61rem;
    padding-top: .2rem;
    border-bottom: 0.01rem solid @bc;
    font-size: .16rem;
    line-height: .4rem;
    .tab {
      color: #000;
      display: inline-block;
      cursor: pointer;
      margin-right: .2rem;
    }
    .active {
      color: @text !important;
      border-bottom: 0.01rem solid @text;
    }
  }
  .button {
    height: .7rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      border: 1px solid @text;
      color: @text;
      padding: 0 .1rem;
      border-radius: .05rem;
      line-height: .3rem;
      font-size: .14rem;
      cursor: pointer;
      transition: .5s all;
      &:hover {
        background: @text;
        color: #fff;
      }
    }
  }
  .item {
    height: 1rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
    border: 1px solid @bc;
    font-size: .16rem;
    color: #000;
    .switch {
      color: @text;
      .el-switch {
        margin-left: .1rem;
      }
    }
  }
}
</style>