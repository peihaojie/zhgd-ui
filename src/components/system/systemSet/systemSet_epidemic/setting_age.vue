<!--
 * @Date         : 2020-02-28 16:39:54
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-05 17:03:25
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
        <span class="btn" @click="add">
          <i class="el-icon-circle-plus-outline"></i>
          设定录入年龄
        </span>
      </div>
      <div class="list">
        <template v-if="list.length">
          <div class="item" v-for="item in list" :key="item.id">
            设定年龄：{{item.age}}
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
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="1rem">
          <el-form-item label="设置年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
        </el-form>
      </dialogs>
    </div>
  </div>
</template>

<script>
import dialogs from "@/base/setting_dialog";
import mixin from "@/utils/mixin";
// 是否只能是唯一值
const only = true;
export default {
  mixins: [mixin],
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else if (value > 100) {
            callback(new Error("不可大于100岁"));
          } else {
            callback();
          }
        }
      }, 100);
    };
    return {
      show: false, // 弹窗
      title: "添加年龄设置",
      ruleForm: {
        age: null
      },
      rules: {
        age: [{ validator: checkAge }]
      },
      list: []
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
      this.$axios.post(`/api/limitAgeList?pid=${this.projectId}`).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.data.list.map(a => {
            return {
              age: a.age,
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
        this.messageBox("年龄只可添加唯一值！", 0);
      }
    },

    clear() {
      this.ruleForm.age = "";
    },

    async confirm() {
      let temp = await this.submitForm("ruleForm");
      if (temp) {
        console.log("验证成功");
        this.$axios
          .post(`/api/addForbidAge?age=${this.ruleForm.age}`)
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
      this.$axios.post(`/api/forbidAge?id=${id}`).then(res => {
        if (res.data.code == 0 && res.data.data.code == 0) {
          this.messageBox("修改成功", 1);
        } else {
          this.messageBox("修改失败", 0);
        }
        this.geAgeList();
      });
    },

    deleteAge(id) {
      this.$axios.post(`/api/deleteForbidAge?id=${id}`).then(res => {
        if (res.data.code == 0 && res.data.data.code == 0) {
          this.messageBox("删除成功", 1);
        } else {
          this.messageBox("删除失败", 0);
        }
        this.geAgeList();
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