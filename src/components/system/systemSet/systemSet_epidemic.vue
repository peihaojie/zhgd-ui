<!--
 * @Date         : 2020-02-28 15:27:18
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-02-28 16:50:38
 * @FilePath     : /src/components/system/systemSet/systemSet_epidemic.vue
 -->
<template>
  <div>
    <div class="center">
      <div class="title">疫情控制设置</div>
      <div class="body">
        <div class="item" v-for="item in list" :key="item.name">
          <div class="icon" :style="{backgroundImage: `url(${item.img})`}"></div>
          <div class="setting">
            {{item.name}}
            <div class="btn" @click="jump(item.name)">
              <i></i>
              设置
            </div>
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
          name: '区域设置',
          img: require('../../../../static/images/setting-regional.png')
        },
        {
          name: '体温设置',
          img: require('../../../../static/images/setting-body-temperature.png')
        },
        {
          name: '年龄设置',
          img: require('../../../../static/images/setting-age.png')
        }
      ]
    }
  },
  components: {},
  mounted() {},
  methods: {
    jump(name) {
      switch (name) {
        case "区域设置":
          this.$router.push('/setting_regional')
          break;
        case "体温设置":
          this.$router.push('/setting_body_temperatur')
          break;
        default:
          this.$router.push('/setting_age')
          break;
      }
    }
  }
}
</script>

<style scoped lang="less">
.center {
  box-shadow: 0 0 0.5rem -0.3rem #666;
  height: 9.5rem;
  border-radius: 0.04rem;
  padding: 0 .2rem;
  .title {
    text-align: center;
    font-size: .24rem;
    line-height: .7rem;
    border-bottom: 0.35rem solid #c5e8ff;
  }
  .body {
    display: flex;
    justify-content: space-between;
    .item {
      min-width: 4rem;
      height: .8rem;
      margin-top: .4rem;
      flex: 1;
      .icon {
        display: inline-block;
        width: .8rem;
        height: 100%;
        background-color: #0090ff;
        background-position: center;
        background-size: auto .44rem;
        background-repeat: no-repeat;
      }
      .setting {
        padding-left: .15rem;
        display: inline-block;
        align-content: space-around;
        font-size: .14rem;
        height: 100%;
        vertical-align: top;
        line-height: .4rem;
        .btn {
          color: #6aa7e1;
          cursor: pointer;
          i {
            display: inline-block;
            width: .16rem;
            height:.16rem;
            background-image: url("../../../../static/images/systemSet-setIcon.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>