<!--
 * @Date         : 2020-02-29 16:42:02
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-02 17:46:10
 * @FilePath     : /src/base/setting_dialog.vue
 * @说明          : 这个组件是疫情设置页面的弹窗
 -->
<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :width="width"
      @close="close"
      center>
      <slot>
      </slot>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">{{button}}</el-button>
        <el-button type="primary" @click="close">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提 示'
    },
    button: {
      type: String,
      default: '确 定'
    },
    width: {
      type: String,
      default: '50%'
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  mounted() {
  },
  watch: {
    show() {
      this.visible = this.show
    }
  },
  computed: {
  },
  methods: {
    // 确定按钮
    confirm() {
      this.$emit('confirm')
    },

    close() {
      this.$emit('update:show', false)
      this.$emit('clear')
    }
  }
}
</script>

<style lang="less" scoped>
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5);
}
/deep/.el-dialog__header {
  color: #fff;
  padding: 0;
  height: 0.6rem;
  font-size: 0.24rem;
  line-height: 0.6rem;
  text-align: center;
  position: relative;
  font-weight: bolder;
  background: linear-gradient(to right, #6cc4ff, #489cff);
}
/deep/.el-dialog {
  border-radius: .1rem;
  overflow: hidden;
}
/deep/.el-dialog__title {
  color: #fff;
  font-size: inherit
}
/deep/.el-dialog__headerbtn .el-dialog__close {
  color: #fff
}
/deep/.el-dialog__footer {
  height: .7rem;
  background-color: #f8f8f8;
  border-top: .01rem solid #dedede;
}
/deep/.el-dialog__footer {
  padding: .1rem;
}
.el-button {
  width: 1.63rem;
  height: .49rem;
  transition: all .5s;
  border-radius: .02rem;
  background-color: #ffd14f;
  border: .01rem solid #d9b759;
  font-size: .2rem;
  text-align: center;
  color: #fff;
}
/deep/.el-input {
  width: 4rem;
  font-size: .14rem;
  input {
    border-radius: 4px;
    border: 1px solid #DCDFE6;
  }
}
</style>
