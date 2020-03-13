<!--
 * @Date         : 2020-02-28 16:37:57
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-05 17:11:18
 * @FilePath     : /src/components/system/systemSet/systemSet_epidemic/setting_regional.vue
 -->
<template>
  <div>
    <div class="center">
      <div class="title">
        <i class="el-icon-arrow-left" @click="back"></i>
          区域设置
      </div>
      <div class="tabs">
        <div class="tab active">区域设置</div>
      </div>
      <div class="button">
        <span class="btn" @click="add">
          <i class="el-icon-circle-plus-outline"></i>
          添加敏感区域
        </span>
      </div>
      <div class="list">
        <template v-if="list.length">
          <div class="item" v-for="item in list" :key="item.id">
            设定区域：{{item.area}}
            <div class="switch">
              <span v-if="item.enter">禁止入内</span>
              <el-switch
                v-model="item.enter"
                active-color="#ff4949"
                inactive-color="#0090ff"
                @change="forbid(item.id)"
              ></el-switch>
              <span class="del" @click="deleteAge(item.id)">删除</span>
            </div>
          </div>
        </template>
      </div>
      <dialogs
        :show.sync="show"
        :title="title"
        width="6rem"
        class="dialog"
        @clear="clear"
        @confirm="confirm"
      >
        设定区域：
        <el-cascader :props="props"></el-cascader>
      </dialogs>
    </div>
  </div>
</template>

<script>
import dialogs from "@/base/setting_dialog";
import mixin from "@/utils/mixin";
// 是否只能是唯一值
const only = false;
export default {
  mixins: [mixin],
  data() {
    return {
      props: {
        lazy: true,
        checkStrictly: true,
        lazyLoad (node, resolve) {
          setTimeout(() => {
            resolve(this.getCityList());
          }, 1000);
        }
      },
      show: false, // 弹窗
      title: "添加敏感区域",
      ruleForm: {
        temperature: null
      },
      list: [],
      active: 'setting'
    };
  },
  components: {
    dialogs
  },
  mounted() {
    this.geAgeList();
  },
  methods: {
    geAgeList() {
      this.$axios.post(`/api/areaSettingList?pid=${this.projectId}`).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.data.list.map(a => {
            return {
              area: a.area,
              enter: a.enter == 1
            };
          });
        }
      });
    },

    back() {
      this.$router.go(-1);
    },

    add() {
      if ((only && !this.list.length) || !only) {
        this.show = true;
      } else {
        this.messageBox("温度只可添加唯一值！", 0);
      }
    },

    clear() {
      this.ruleForm.temperature = "";
    },

    async confirm() {
      let temp = await this.submitForm("ruleForm");
      if (temp) {
        console.log("验证成功");
        this.$axios
          .post(`/api/addAreaSetting?temperature=${this.ruleForm.temperature}`)
          .then(res => {
            if (res.data.code == 0 && res.data.data.code == 0) {
              this.messageBox("添加成功", 1);
            } else {
              this.messageBox("修添加失败", 0);
            }
            this.geAgeList();
          });
        this.show = false;
        this.clear();
      } else {
        console.log("验证失败");
      }
    },

    forbid(id) {
      this.$axios.post(`/api/forbidAreaSetting?id=${id}`).then(res => {
        if (res.data.code == 0 && res.data.data.code == 0) {
          this.messageBox("修改成功", 1);
        } else {
          this.messageBox("修改失败", 0);
        }
        this.geAgeList();
      });
    },

    deleteAge(id) {
      this.$axios.post(`/api/deleteAreaSetting?id=${id}`).then(res => {
        if (res.data.code == 0 && res.data.data.code == 0) {
          this.messageBox("删除成功", 1);
        } else {
          this.messageBox("删除失败", 0);
        }
        this.geAgeList();
      });
    },

    keydown(e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0})/g)[0]) || null
      this.ruleForm.temperature = e.target.valu
    },

    // 获取城市列表
    getCityList(id='') {
      this.$axios
        .post(`/api/AreaSettingAll?id=${id}`)
        .then(res => {
          if (res.data.code == 0) {
            return res.data.data
          }
        })
    }
  }
};
</script>

<style scoped lang="less">
@bc: #c5e8ff;
@text: #0090ff;
.center {
  box-shadow: 0 0 0.5rem -0.3rem #666;
  height: 9.5rem;
  border-radius: 0.04rem;
  padding: 0 0.2rem;
  overflow-y: auto;
  .title {
    text-align: center;
    font-size: 0.24rem;
    line-height: 0.7rem;
    border-bottom: 0.01rem solid @bc;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      font-size: 0.3rem;
      color: @text;
      cursor: pointer;
    }
  }
  .tabs {
    height: 0.61rem;
    padding-top: 0.2rem;
    border-bottom: 0.01rem solid @bc;
    font-size: 0.16rem;
    line-height: 0.4rem;
    .tab {
      color: #000;
      display: inline-block;
      cursor: pointer;
      margin-right: 0.2rem;
    }
    .active {
      color: @text !important;
      border-bottom: 0.01rem solid @text;
    }
  }
  .button {
    height: 0.7rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      border: 1px solid @text;
      color: @text;
      padding: 0 0.1rem;
      border-radius: 0.05rem;
      line-height: 0.3rem;
      font-size: 0.14rem;
      cursor: pointer;
      transition: 0.5s all;
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
    padding: 0 0.2rem;
    border: 1px solid @bc;
    font-size: 0.16rem;
    color: #000;
    margin-bottom: 0.1rem;
    .switch {
      color: @text;
      .el-switch {
        margin-left: 0.1rem;
      }
      .del {
        margin-left: 0.1rem;
      }
    }
  }
  .dialog {
    line-height: 0.4rem;
    font-size: 0.14rem;
  }
}
</style>