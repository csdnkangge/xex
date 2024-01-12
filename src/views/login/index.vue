<template>
  <div class="login-container">
    <div class="bg_img"></div>
    <transition name="el-zoom-in-top">
      <el-row align="middle" type="flex" justify="center">
        <el-col :span="12">
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
            label-width="0px" class="card-box login-form" v-show="contentShow" size="medium">
            <div class="login_box">
              <div class="leftSection">
                <div class="titleLine">
                  <img :src="logo" alt="" class="logo">
                  <div class="title">{{ $t("login.title") }}</div>
                </div>
                <el-form-item prop="username">
                  <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                    :placeholder="$t('login.userName')" class="userInput input">
                    <i slot="prefix">
                      <img :src="userIcon" class="userNameIcon" />
                    </i>
                    <i slot="suffix" v-if="loginForm.username" @click="loginForm.username = ''">
                      <img :src="clearIcon" class="deleteIcon" />
                    </i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on" :placeholder="$t('login.password')" class="passwordInput input">
                    <i slot="prefix">
                      <img :src="passwordIcon" class="passwordIcon" />
                    </i>
                  </el-input>
                  <!-- <span class="show-pwd" @mousedown.left="mouseDownHold" @mouseup="mouseHoldStop"><svg-icon icon-class="eye" /></span> -->
                  <!-- <span @click="showPwd" class="fa fa-eye-slash show-pwd" v-if="pwdType == 'password'"></span>
                  <span @click="showPwd" class="fa fa-eye show-pwd" v-else></span> -->
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="loginBtn" style="width:100%; border: none;"
                    @click.native.prevent="loginBtnClick" :loading="loading"
                    :disabled="!loginForm.username || !loginForm.password" :class="loginForm.username && loginForm.password
                      ? 'checked'
                      : 'no_checked'
                      ">
                    <span>{{ $t("login.loginBtn") }}</span>
                  </el-button>
                </el-form-item>
              </div>
              <div class="rightSection">
                <div class="tips1">
                  {{ $t("login.welcome") }}<img :src="smileIcon" alt="">
                </div>
                <div class="tips2">
                  {{ $t("login.name") }}
                </div>

              </div>

              <!-- <el-row>
                <el-form-item prop="username">
                  <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                    :placeholder="$t('login.userName')" prefix-icon="icon-font icon-zhanghao" class="input" clearable>
                  </el-input>
                </el-form-item>
              </el-row> -->
              <!-- <el-row>
                <el-form-item prop="password">
                  <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on" :placeholder="$t('login.password')" prefix-icon="icon-font icon-mima" class="input">
                    <i slot="prefix" class="iconfont icon-psw login-icon"></i>
                  </el-input>                  
                  <span @click="showPwd" class="fa fa-eye-slash show-pwd" v-if="pwdType == 'password'"></span>
                  <span @click="showPwd" class="fa fa-eye show-pwd" v-else></span>
                </el-form-item>
              </el-row> -->
              <!-- <el-row justify="center" type="flex">
                <el-form-item>
                  <el-radio-group v-model="lang" @change="handleChangeLanguage">
                    <el-radio label="zh">{{ $t("login.zh") }}</el-radio>
                    <el-radio label="en">{{ $t("login.en") }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row> -->
              <!-- <el-row>
                <el-form-item>
                  <el-button type="primary" round style="width:100%; border: none;" @click.native.prevent="handleLogin"
                    :loading="loading" :class="loginForm.username && loginForm.password
                      ? 'checked'
                      : 'no_checked'
                      ">
                    <span>{{ $t("login.loginBtn") }}</span>
                  </el-button>
                </el-form-item>
              </el-row>
              <div class="welcome_tips">
                <div class="tips_1">欢迎来到！</div>
                <div class="tips_2">合伙人管理系统</div>
              </div> -->
            </div>
            <!-- <div class="bottom_section">
              <div class="welcome_box">
                WELCOME
                <div class="welcome_tips">
                  <div class="tips_1">欢迎来到！</div>
                  <div class="tips_2">合伙人管理系统</div>
                </div>
              </div>
            </div> -->
          </el-form>
        </el-col>
      </el-row>
    </transition>
  </div>
</template>
<script>
import md5 from "js-md5";
import Cookies from "js-cookie";
import Api from "@/api/login";
import logo from "@/assets/images/login/logo.png";
import userIcon from "@/assets/images/login/yonghu.png";
import passwordIcon from "@/assets/images/login/mima.png";
import clearIcon from "@/assets/images/login/shanchu.png";
import smileIcon from "@/assets/images/login/icon1.png";
import CryptoJS from 'crypto-js';
export default {
  name: "login",
  data () {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      logo,
      userIcon,
      passwordIcon,
      clearIcon,
      smileIcon,
      loginForm: {
        username: "",
        password: "",
        token: ""
      },
      lang: Cookies.get("language") ? Cookies.get("language") : "zh",
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "登录账号不能为空"
            // validator: validateUsername
          }
        ],
        password: [{ required: true, trigger: "blur", message: "请填写密码" }]
      },
      loading: false,
      pwdType: "password",
      checkbox: false,
      contentShow: false,
      verCodeSrc: "",
      captchaObj:null,
      canUseBaseUrl: ['https://node1.v-link.xyz/fe-ex-api/cms/getGeeTestParams', "https://node1.taucoin.zone/fe-ex-api/common/tartCaptcha",],
      captchaId: '8f234502a9ec540d0eca39d54e29a0af',
      // captchaKey: encryptData('43f844a9a4dbf2cbd90596c1b1316cc9'),
    };
  },
  computed: {
    lan () {
      return this.$i18n.locale;
    },
    geetestLan () {
      let language = "";
      // 简体中文
      if (this.lan === "zh") {
        language = "zho";
        // 英文
      } else if (this.lan === "en") {
        language = "eng";
      }

      if (!language.length) {
        language = "en";
      }
      return language;
    },
    loginInfo () {
      return {
        username: this.loginForm.username,
        password: md5(this.loginForm.password)
      };
    },
    cookieName () {
      return this.loginForm.username;
    }
  },
  watch: {
    cookieName (val) {
      if (val) {
        if (Cookies.get(val)) {
          this.loginForm.password = Cookies.get(val);
        }
      }
    }
  },
  mounted () {
    this.geetest();
    setTimeout(() => {
      this.contentShow = true;
      // this.captchaObj.showCaptcha();
    }, 500);

  },
  methods: {
    loginBtnClick() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.captchaObj.showCaptcha();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    geetest() {
      
      // 第四代
      window.initGeetest4(
        {
          captchaId: this.captchaId, // 第四代新增参数，极验后台获取
          // 以下 4 个配置参数为必须，不能缺少
          product: 'bind',
          lang: this.geetestLan,
          // gt,
          // challenge,
          // offline: !success, // 表示用户后台检测极验服务器是否宕机
          // new_captcha: true, // 用于宕机时表示是新验证码的宕机
          // width: '100%',
          // area: '#geetest_box', // bind时 **必填参数**
        },
        (captchaObj) => {
          this.nowState = true;
          this.captchaObj = captchaObj;
          captchaObj.onClose(() => {
            // 用户把验证关闭了，这时你可以提示用户需要把验证通过后才能进行后续流程
            this.showVerify = false;
          });
          // this.$emit('getCaptchaObj', captchaObj);
          captchaObj.onReady(() => {
            // this.isReady = true;
            // this.$nextTick(() => {
            //   this.setStyle();
            // });
          });
          captchaObj.onError(() => {
            this.showVerify = false;
          });
          captchaObj.onSuccess(() => {
            this.handleLogin()
            // this.nowState = false;
            // const result = captchaObj.getValidate();
            // console.log(result);
            // setTimeout(() => {
            //   this.showVerify = false;
            //   this.verifyCallBack({
            //     captchaOutput: result.captcha_output,
            //     captchaId: result.captcha_id,
            //     genTime: result.gen_time,
            //     captchaKey: this.captchaKey,
            //     lotNumber: result.lot_number,
            //     passToken: result.pass_token,
            //     // secCode: result.geetest_seccode,
            //     // validate: result.geetest_validate,
            //     verificationType: '3',
            //     // token: true
            //   });
            // }, 300);
          });
        },
      );
    },
    
    handleChangeLanguage (e) {
      Cookies.set("language", e);
      this.$i18n.locale = e;
    },
    showPwd () {
      if (this.pwdType === "") {
        this.pwdType = "password";
      } else {
        this.pwdType = "";
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              if (this.checkbox) {
                Cookies.set(this.loginForm.username, this.loginForm.password, {
                  expires: 7
                });
              }
              this.loading = false;
              this.$router.push({ name: "dashboard" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
$bg: #f9f9f9;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  min-width: 1440px;
  background-color: $bg;
  overflow: hidden;
  position: relative;

  .bg_img {
    background-image: url("../../assets/images/login/login_bg.png");
    position: absolute;
    // position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    animation: bgScale 7s infinite;
    animation-direction: alternate;
  }

  .login_box {
    // background: rgba(255, 255, 255, 0.9);
    // padding: 150px 147px 116px 34px;
    padding-left: 34px;
    padding-top: 32px;
    padding-bottom: 36px;
    border-radius: 12px;
    width: 780px;
    height: 700px;
    margin: 0 auto;
    background-image: url(../../assets/images/login/form_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // background: linear-gradient(135deg, #a9b2ff 0%, #707aff 100%);
    // box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .leftSection {
      width: 460px;
      // background: green;
      padding: 167px 48px 0;
      height: 100%;

      .titleLine {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 34px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #7473FF;
        line-height: 48px;
        margin-bottom: 40px;

        .logo {
          width: 36px;
        }
      }

      .userNameIcon {
        width: 20px
      }

      .deleteIcon {
        width: 14px;
      }

      .passwordIcon {
        width: 16px;
      }

    }

    .rightSection {
      width: 251px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: left;

      .tips1 {
        color: #fff;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 33px;
        position: relative;

        img {
          width: 20px;
          position: absolute;
          right: -25px;
          top: 5px;
        }
      }

      .tips2 {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 25px;
      }
    }

    .input {
      width: 364px;
      height: 49px;
      border-radius: 24px;
      border: 2px solid #ffffff;

      input.el-input__inner {
        width: 100%;
        height: 45px;
        line-height: 45px;
        background: transparent;
        color: #4E4E4E;
        font-size: 16px;
        border-radius: 10px;
        padding-left: 50px;
      }

      input.el-input__inner::placeholder {
        color: (78, 78, 78, 0.4);
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
      }

      .el-input__icon {
        color: #fff;
        font-size: 14px;
        padding-left: 4px;
      }

      .el-input__prefix {
        top: 3px;
        left: 15px;
      }

      .el-input__suffix {
        // im
        right: 10px;
      }
    }

    .passwordInput {
      .el-input__prefix {
        top: 2px;
        left: 15px;
      }
    }

    .loginBtn {
      margin-top: 20px;
      height: 49px;
      background: linear-gradient(225deg, #DF69D1 0%, #976FFF 100%);
      border-radius: 10px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;

    }
  }

  .login-form {
    position: relative;
    margin: 140px auto 0;

    .el-form-item__content {
      line-height: 50px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}

.v-code {
  height: 60px;
  width: 100%;
  margin-left: 10px;

  img {
    width: 94%;
    height: 38px;
    border-radius: 10px;
  }

  img:hover {
    cursor: pointer;
  }
}

.login-icon {
  font-size: 20px;
  color: #888;
}
</style>

<style lang="scss">
@media (max-width: 768px) {
  // 在移动端应用的样式
  .geetest_box_wrap{
    top:450px !important;
  }
  .geetest_popup_ghost{
    height:840px !important;
  }
}
  
</style>