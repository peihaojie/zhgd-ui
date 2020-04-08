<template>
  <!-- 登录页面主体区域 -->
  <div class="main" id="main">
    <!-- 导航栏 -->
    <div class="nav">
      <div class="logo-img"></div>
      <div class="logo-URL">
        <p>工地系统云平台</p>
        <span>gd.hj-tec.com</span>
      </div>
      <p>最省心的智慧工地综合服务商</p>
    </div>
    <!-- 主体内容 -->
    <div class="content">
      <!-- 登录框 -->
      <div class="login">
        <div class="login-title">用户登录</div>
        <div class="from">
          <i class="user"></i>
          <input type="text" placeholder="请输入账号" v-model="user_name" @keyup.enter="login" />
          <i class="password"></i>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="pwd"
            @keyup.enter="login"
            ref="passWord"
          />
          <el-tooltip effect="dark" content="记住密码" placement="right">
            <el-checkbox v-model="save"></el-checkbox>
          </el-tooltip>
          <a @click="login"></a>
        </div>
        <div class="logo"></div>
      </div>
    </div>
    <!-- 底部通栏 -->
    <div class="bottom">
      <ul>
        <li>
          <img src="../../../static/images/login1.png" alt />
          <p class="title">关于虎匠</p>
        </li>
        <li>
          <img src="../../../static/images/login2.png" alt />
          <p class="title">产品介绍</p>
        </li>
        <li>
          <img src="../../../static/images/login3.png" alt />
          <p class="title">经典案例</p>
        </li>
        <li>
          <img src="../../../static/images/login4.png" alt />
          <p class="title">联系我们</p>
        </li>
      </ul>
    </div>
    <div class="registration-number">
      <p>Copyright © 2018 - 2020 深圳市虎匠科技投资发展有限公司版权所有</p>
      <a data-v-7cc8a79a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备18104689号</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: "",
      pwd: "",
      save: false
    };
  },
  methods: {
    // 1.0登录
    logined() {
      this.$axios
        .post("/lz/wisdom/wisdomLogin", {
          account: this.user_name,
          password: this.$md5(this.pwd)
        })
        .then(res => {
          if (res.data.msg != "账户或密码错误") {
            localStorage.setItem("islogin", "true");
            localStorage.setItem("pid", res.data.pid);
            this.$router.push({ path: "/homePage" });
          } else {
            alert("账号或密码错误！请重新输入");
            // this.user_name = "";
            this.pwd = "";
          }
        });
    },

    // 2.0登录
    login() {
      if (this.user_name == "" || this.pwd == "") {
        this.$message({
          type: "warning",
          message: "账号或密码不得为空"
        });
      } else {
        this.$axios
          .post(
            `/api/system/computer/login?userAccount=${
              this.user_name
            }&userPassword=${this.$md5(this.pwd)}&entry=1`
          )
          .then(res => {
            if (res.data.code == -1) {
              this.$message({
                type: "warning",
                message: "账号或密码错误！请重新输入"
              });
              this.pwd = "";
              this.$refs.passWord.focus();
            } else {
              if (this.save) {
                localStorage.setItem("userAccount", this.user_name);
                localStorage.setItem("userPassword", this.pwd);
              }
              sessionStorage.setItem("islogin", "true");
              sessionStorage.setItem("pid", res.data.data.projectId);
              sessionStorage.setItem("cid", res.data.data.companyId);
              sessionStorage.setItem("userType", res.data.data.userType);
              sessionStorage.setItem("userId", res.data.data.id);
              sessionStorage.setItem("userAccount", res.data.data.userAccount);
              sessionStorage.setItem("userName", res.data.data.userName);
              localStorage.setItem("pid", 2977);
              localStorage.setItem("islogin", "true");
              if (res.data.data.userType == 2) {
                this.$router.push({ path: "/systemHome" });
                // this.$router.push({ path: "/systemLiangZhi" })
              } else {
                this.$router.push({ path: "/homePage" });
              }
            }
          });
      }
    },

    // 是否保存了密码
    hasPassWord() {
      let userName = localStorage.getItem("userAccount");
      let passWord = localStorage.getItem("userPassword");
      if (userName && passWord) {
        this.user_name = userName;
        this.pwd = passWord;
      }
    },

    // 切换header
    header() {
      // this.$store.commit('changeSystemHeader', false)
      // this.$store.commit('changeHeader', false)
    }
  },
  mounted() {
    localStorage.setItem("home", false);
    localStorage.setItem("system", false);
    this.hasPassWord();
    this.header();
  }
};
</script>

<style lang="less">
#main {
  height: 100vh;
  min-height: 9.6rem;
  background-color: #fff;
  user-select: none;
  position: relative;
  .nav {
    padding: 0.2rem 0;
    margin-left: 3.2rem;
    > div {
      display: inline-block;
    }
    .logo-img {
      width: 0.88rem;
      height: 0.4rem;
      background-image: url("../../../static/images/login_zh.png");
      background-size: contain;
    }
    .logo-URL {
      height: 0.4rem;
      padding-right: 0.16rem;
      border-right: 0.01rem solid #848484;
      margin-left: 0.05rem;
      margin-right: 0.17rem;
      line-height: 0.2rem;
      color: #848484;
      vertical-align: top;
      > p {
        font-size: 0.18rem;
        font-weight: 500;
      }
      > span {
        font-size: 0.16rem;
      }
    }
    > p {
      display: inline-block;
      color: #848484;
      line-height: 0.4rem;
      vertical-align: top;
      font-size: 0.15rem;
    }
  }
  .bottom {
    padding: 0.2rem 2rem;
    ul {
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      li {
        width: 2.9rem;
        text-align: center;
        img {
          width: 1.02rem;
          height: 1.02rem;
        }
        .title {
          font-size: 0.2rem;
          color: #048fe8;
          margin-top: 0.13rem;
        }
      }
    }
  }
  .registration-number {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.45rem;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 0.16rem;
    p {
      margin-right: 0.1rem;
    }
    a {
      font-size: 0.12rem;
    }
  }
  .content {
    height: 6.5rem;
    background-image: url("../../../static/images/login_light.png"), url("../../../static/images/login_bg.png");
    background-size: cover;
    position: relative;
    background-position: center;
    .login {
      width: 3.99rem;
      height: 4.17rem;
      background-image: url("../../../static/images/login_border.png");
      background-size: contain;
      position: absolute;
      right: 15%;
      top: 50%;
      transform: translateY(-50%);
      padding-top: 0.38rem;
      .login-title {
        color: #fff;
        font-size: 0.31rem;
        font-weight: bolder;
        line-height: 0.31rem;
        text-align: center;
      }
      .from {
        margin-top: 0.52rem;
        position: relative;
        /deep/.el-checkbox__inner {
          width: 0.14rem;
          height: 0.14rem;
        }
        .user {
          background-image: url("../../../static/images/login_user.png");
          left: 0.68rem;
          top: 0.11rem;
          z-index: 99;
        }
        i {
          position: absolute;
          width: 0.15rem;
          height: 0.15rem;
          background-size: contain;
        }
        input {
          width: 2.92rem;
          height: 0.38rem;
          background-image: url("../../../static/images/login_input.png");
          background-size: contain;
          padding-left: 0.43rem;
          position: absolute;
          z-index: 10;
          left: 50%;
          transform: translate(-50%);
          &:nth-child(4) {
            margin-top: 0.63rem;
          }
        }
        .password {
          background-image: url("../../../static/images/login_password.png");
          left: 0.68rem;
          top: 0.77rem;
          z-index: 99;
        }
        a {
          width: 2.92rem;
          height: 0.38rem;
          background-image: url("../../../static/images/login_button.png");
          background-size: contain;
          position: absolute;
          z-index: 10;
          left: 50%;
          transform: translate(-50%);
          margin-top: 1.27rem;
          overflow: hidden;
          &:before {
            content: "";
            background-color: #fff;
            opacity: 0.5;
            display: block;
            height: 100%;
            width: 0.5rem;
            transform: skewX(-45deg) translateX(0);
            position: absolute;
            top: 0;
            left: -0.7rem;
          }
          &:hover {
            &:before {
              transform: skewX(-45deg) translateX(3.8rem);
              transition: all 0.5s ease-in-out;
            }
          }
          &:active {
            opacity: 0.5;
            transition: all 0.2s ease-in-out;
          }
        }
      }
      .logo {
        width: 1.5rem;
        height: 0.6rem;
        bottom: 0.3rem;
        background-image: url("../../../static/images/yzt-whiteLogo.png");
        // background-image: url("../../../static/images/lbrj_login.png");
        // background-image: url("../../../static/images/hj_login.png");
        background-size: contain;
        position: absolute;
        z-index: 10;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
  .el-checkbox {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    z-index: 20;
    .el-checkbox__inner {
      border: 1px solid #333;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border: 1px solid #409eff;
    }
    input {
      width: auto !important;
      height: auto !important;
      cursor: pointer;
    }
  }
}
</style>
