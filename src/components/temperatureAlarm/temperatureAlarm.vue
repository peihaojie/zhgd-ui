<!--
 * @Date         : 2020-02-18 11:08:51
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-19 19:16:44
 * @FilePath     : \src\components\temperatureAlarm\temperatureAlarm.vue
 -->
<template>
  <div class="body-wrap">
    <!-- 广告信息 -->
    <div class="header">
      <i class="back" @click="back"></i>
      <div class="center">{{ titleName }}</div>
      <i class="logo"></i>
    </div>
    <div class="content">
      <!-- 摄像头列表 -->
      <div class="list-wrap">
        <div class="list-name">
          <i></i>
          视频列表
        </div>
        <div class="list-details">
          <!-- 搜索框 -->
          <el-input
            type="text"
            placeholder="搜索"
            clearable
            suffix-icon="el-icon-search"
            @input="searchChange"
            v-model="search"
          ></el-input>
          <!-- 列表 -->
          <div
            class="list"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(3, 6, 37)"
          >
            <!-- 正常列表 -->
            <div class="default-list"></div>
            <!-- 搜索列表 -->
            <div class="search-list"></div>
          </div>
        </div>
        <!-- 列表底部按钮 -->
        <div class="list-bottom">
          <i class="el-icon-folder-add" @click="dialogClick('files')"></i>
          <i class="el-icon-video-camera" @click="dialogClick('video')"></i>
        </div>
      </div>
      <!-- 视频播放 -->
      <div class="video-wrap">
        <!-- 视频 -->
        <div class="video"></div>
        <!-- 视频下的按钮 -->
        <div class="video-bottom">
          <i class="el-icon-setting" @click="dialogClick('setting')"></i>
          <i class="el-icon-menu"></i>
          <i class="el-icon-full-screen"></i>
        </div>
      </div>
    </div>
    <!-- 修改header名称弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialog" width="30%" center>
      <el-input
        v-if="dialogTitle === '修改提示语'"
        type="textarea"
        placeholder="请输入提示语"
        v-model="textarea"
        maxlength="25"
        show-word-limit
        :rows="3"
      ></el-input>
      <el-input
        v-if="dialogTitle === '新建分组'"
        type="text"
        placeholder="请输入分组名"
        v-model="newFileName"
        clearable
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <div @click="saveDialog">保存</div>
        <div @click="dialog = false">取消</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/utils/mixin';
export default {
  mixins: [mixin],
  data() {
    return {
      titleName: "虎将科技，助力防疫，武汉加油！", // 提示语的名称
      search: "", // 搜索的内容
      loading: false, // 转圈圈
      dataList: [], // 左侧列表数据
      dialog: false, // 弹窗
      dialogTitle: "", // 弹窗显示的名称
      textarea: "", // 提示语
      newFileName: "", // 新建分组名称
    };
  },
  components: {},
  mounted() {},
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },

    // 搜索请求的发送
    searchChange() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        // 这里调用请求的函数
        console.log(this.search);
      }, 300);
    },

    // 弹窗点击
    dialogClick(name) {
      this.dialog = true;
      switch (name) {
        case "setting":
          this.dialogTitle = "修改提示语";
          this.textarea = this.titleName;
          break;
        case "files":
          this.dialogTitle = "新建分组";
          this.newFileName = ""
          break;
        case "video":
          this.dialogTitle = "添加摄像头";
          break;
        default:
          break;
      }
    },

    // 点击保存
    saveDialog() {
      this.messageBox("该功能暂未开放", 0)
      this.dialog = false
      switch (this.dialogTitle) {
        case "修改提示语":
          console.log(this.dialogTitle);
          break;
        case "新建分组":
          console.log(this.dialogTitle);
          break;
        case "添加摄像头":
          console.log(this.dialogTitle);
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
@border-color: #0f1f53;
@hover: #0e112c;
@bg: #030625;
.body-wrap {
  padding: 0 0.25rem 0.25rem;
  height: 10.8rem;
  .header {
    height: 0.7rem;
    position: relative;
    .center {
      font-family: pmzd;
      width: 10.3rem;
      margin: auto;
      background-image: url("../../../static/images/header-background.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
      font-size: 0.42rem;
      line-height: 0.7rem;
      font-weight: 500;
      text-align: center;
    }
    .back {
      width: 0.31rem;
      height: 0.27rem;
      background-image: url("../../../static/images/temperatureAlarm-back.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .logo {
      width: 1.43rem;
      height: 0.25rem;
      background-image: url("../../../static/images/temperatureAlarm-logo.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  .content {
    margin-top: 0.25rem;
    height: calc(100% - 0.95rem);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .list-wrap {
      flex: 0 0 3.6rem;
      margin-right: 0.25rem;
      background-image: url("../../../static/images/temperatureAlarm-list.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .list-name {
        line-height: 0.5rem;
        font-size: 0.18rem;
        font-weight: 500;
        color: #fff;
        padding: 0 0.2rem;
        i {
          width: 0.15rem;
          height: 0.15rem;
          display: inline-block;
          background-image: url("../../../static/images/icon.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      .list-details {
        height: calc(100% - 1.05rem);
        padding: 0.03rem;
        .el-input {
          padding: 0.1rem;
          font-size: 0.14rem;
          /deep/.el-input__inner {
            line-height: 0.4rem;
            height: 0.4rem;
            background-color: @hover;
            color: #fff;
          }
          /deep/.el-input__icon {
            line-height: 0.4rem;
            margin-right: 0.1rem;
          }
        }
        .list {
          height: calc(100% - 0.6rem);
          overflow-y: auto;
          .default-list {
          }
        }
      }
      .list-bottom {
        height: 0.55rem;
        position: relative;
        i {
          color: #cacad0;
          font-size: 0.24rem;
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.5s;
          &:hover {
            transform: scale(1.5) translateY(-37.5%);
            color: #275acb;
          }
        }
        .el-icon-folder-add {
          left: 0.3rem;
        }
        .el-icon-video-camera {
          left: 0.95rem;
        }
      }
    }
    .video-wrap {
      flex: 1;
      background-image: url("../../../static/images/temperatureAlarm-content.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 0.03rem;
      .video {
        height: 9rem;
      }
      .video-bottom {
        height: calc(100% - 9rem);
        position: relative;
        i {
          color: #cacad0;
          font-size: 0.24rem;
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.5s;
          &:hover {
            transform: scale(1.5) translateY(-37.5%);
            color: #275acb;
          }
        }
        .el-icon-setting {
          right: 1.3rem;
        }
        .el-icon-menu {
          right: 0.7rem;
        }
        .el-icon-full-screen {
          right: 0.15rem;
        }
      }
    }
  }
  /deep/.el-dialog {
    border: 0.01rem solid @border-color;
    background: @bg;
    box-shadow: inset 0 0 5px 0px @border-color;
    .el-dialog__header {
      padding: 0.2rem 0.2rem 0.1rem;
      .el-dialog__title {
        font-size: 0.18rem;
        color: #fff;
        line-height: 0.24rem;
      }
    }
    .el-dialog__body {
      padding: 0.25rem;
      font-size: 0.14rem;
      .el-textarea__inner {
        font-size: 0.14rem;
        padding: 0.05rem 0.15rem;
        border-radius: 0.04rem;
      }
      .el-input__count {
        font-size: 0.12rem;
        bottom: 0.05rem;
        right: 0.1rem;
      }
      .el-input__inner {
        font-size: .14rem;
        height: .4rem;
        line-height: .4rem;
      }
      .el-input__icon {
        width: .25rem;
        line-height: .4rem;
        font-size: .14rem;
      }
    }
    .el-dialog__footer {
      padding: .2rem 1.8rem;
      .dialog-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          width: 1rem;
          display: inline-block;
          line-height: .4rem;
          font-size: .14rem;
          color: #fff;
          border: .01rem solid @border-color;
          border-radius: .05rem;
          cursor: pointer;
          transition: .5s all;
          &:hover {
            background: @border-color;
          }
        }
      }
    }
  }
}
</style>