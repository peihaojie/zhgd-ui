<!--
 * @Date         : 2020-02-28 16:37:57
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-25 16:35:00
 * @FilePath     : \src\components\system\systemSet\systemSet_epidemic\setting_regional.vue
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
            设定区域：{{item.title}}
            <div class="switch">
              <span v-if="item.enter">禁止入内</span>
              <el-switch
                v-model="item.enter"
                active-color="#c3c3c3"
                inactive-color="#0090ff"
                @change="forbid(item.areaId, item.enter)"
              ></el-switch>
              <span class="del" @click="deleteAge(item.areaId)">删除</span>
            </div>
          </div>
        </template>
      </div>
      <dialogs
        :show.sync="show"
        :title="title"
        :background="false"
        width="6rem"
        class="dialog"
        @clear="clear"
        @confirm="confirm"
      >
        设定区域：
        <el-cascader
          v-model="addArea"
          :options="options"
          :props="{ multiple: true, checkStrictly: true }"
        ></el-cascader>
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
      options: [],
      show: false, // 弹窗
      title: "添加敏感区域",
      list: [],
      active: "setting",
      projectId: sessionStorage.getItem("pid"),
      addArea: []
    };
  },
  components: {
    dialogs
  },
  mounted() {
    this.getProvince();
    this.getAgeList();
  },
  methods: {
    getProvince() {
      this.$axios.post(`/api/hjarea/selectAllProvinceAndCity`).then(res => {
        if (res.data.code == 0) {
          let list = res.data.data.map(a => {
            return {
              id: a.id,
              label: a.title,
              value: a.id,
              type: a.type,
              parentId: a.parentId,
              isid: a.isid
            };
          });
          list
            .filter(a => a.type === "PROVINCE")
            .forEach(a => {
              list.forEach(b => {
                if (
                  b.parentId == a.id &&
                  b.id != 1001 &&
                  b.id != 1002 &&
                  b.id != 1073 &&
                  b.id != 1234 &&
                  b.id != 1343 &&
                  b.id != 1344 &&
                  b.id != 1345
                ) {
                  a.children = a.children ? a.children : new Array();
                  a.children.push(b);
                }
              });
            });
          this.options = list;
        }
      });
    },

    getAgeList() {
      this.$axios
        .post(`/api/hjarea/areaSettingList?pid=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.forEach(a => a.enter = a.enter == 1);
            this.list = res.data.data;
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
      this.addArea = [];
    },

    async confirm() {
      if (this.addArea.length) {
        let ids = "";
        this.addArea.forEach(a => {
          ids = ids + a[a.length - 1] + ",";
        });
        ids = ids.substring(0, ids.length - 1);
        this.$axios
          .post(`/api/hjarea/addAreaSetting?ids=${ids}&pid=${this.projectId}`)
          .then(res => {
            if (res.data.code == 0) {
              this.messageBox("添加成功", 1);
            } else {
              this.messageBox("修添加失败", 0);
            }
            this.getAgeList();
          });
        this.show = false;
        this.clear();
      } else {
        this.messageBox("区域选择不可为空！", 0);
        console.log("验证失败");
      }
    },

    forbid(id, enter) {
      this.$axios
        .post(`/api/hjarea/forbidAreaSetting?id=${id}&pid=${this.projectId}&enter=${enter ? 1 : 0}`)
        .then(res => {
          if (res.data.code == 0) {
            this.messageBox("修改成功", 1);
          } else {
            this.messageBox("修改失败", 0);
          }
          this.getAgeList();
        });
    },

    deleteAge(id) {
      this.$axios.post(`/api/hjarea/deleteAreaSetting?id=${id}&pid=${this.projectId}`).then(res => {
        if (res.data.code == 0) {
          this.messageBox("删除成功", 1);
        } else {
          this.messageBox("删除失败", 0);
        }
        this.getAgeList();
      });
    },

    // 获取城市列表
    getCityList(id = "") {
      this.$axios.post(`/api/AreaSettingAll?id=${id}`).then(res => {
        if (res.data.code == 0) {
          return res.data.data;
        }
      });
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