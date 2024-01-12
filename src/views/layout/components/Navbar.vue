<template>
  <div class="navbar_container">
    <el-menu mode="horizontal" class="navbar">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
      <breadcrumb class="breadcrumb-container" />
      <div class="avatar-wrapper">
        <span class="el-dropdown-link">
          {{ userinfo.username }}
        </span>
        <el-button icon="icon-font icon-a-icon_tuichudengchu" class="" type="text" @click="logout"></el-button>
        <!-- <el-dropdown :hide-on-click="false" @command="handleMenuCommand">
          <span class="el-dropdown-link">
            {{ userinfo.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="language">{{
              $t("navbar.command1")
            }}</el-dropdown-item>
            <el-dropdown-item command="signout">{{
              $t("navbar.command2")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="text" @click="logout">
          <i class="icon-font icon-a-icon_tuichudengchu" style="color:#000"></i>
        </el-button> -->
      </div>
      <!-- 语言切换弹窗 -->
      <el-dialog :title="$t('navbar.command1')" :visible.sync="dialogVisible['language']" width="25%" class="pop_mask">
        <el-row justify="center" type="flex">
          <el-radio-group v-model="language">
            <el-radio label="zh">{{ $t("login.zh") }}</el-radio>
            <el-radio label="en">{{ $t("login.en") }}</el-radio>
          </el-radio-group>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button class="cancle_btn" @click="dialogVisible['language'] = false">{{ $t("cancel") }}</el-button>
          <el-button class="confirm_btn" type="primary" @click="handleChangeLan">{{ $t("confirm") }}</el-button>
        </span>
      </el-dialog>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import userApi from "@/api/user";
// import Cookies from "js-cookie";
import { getLanguage, setLanguage } from "@/utils/language";
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data () {
    return {
      dialogVisible: {
        language: false
      },
      language: getLanguage() ? getLanguage() : "zh"
    };
  },
  ...mapGetters(["userinfo"]),
  computed: { ...mapGetters(["userinfo", "sidebar"]) },
  methods: {
    handleChangeLan () {
      setLanguage(this.language);
      this.$i18n.locale = this.language;
      if (this.$i18n.locale == "en") {
        window.document.title = "Partner System";
      } else if (this.$i18n.locale == "zh") {
        window.document.title = "合伙人系统";
      }
      this.$set(this.dialogVisible, "language", false);
    },
    handleMenuCommand (e) {
      if (e == "language") {
        this.dialogVisible.language = true;
      }
      if (e == "signout") {
        this.logout();
      }
    },
    toggleSideBar () {
      this.$store.dispatch("toggleSideBar");
    },
    logout () {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
$color_main: #707aff;

.navbar {
  height: 80px;
  line-height: 80px;
  border-radius: 0px !important;
  border-bottom: none !important;

  .hamburger-container {
    line-height: 88px;
    height: 80px;
    float: left;
    padding: 0 10px;
  }

  .avatar-wrapper {
    padding-right: 24px;
    height: 80px;
    display: inline-block;
    position: absolute;
    right: 5px;
    font-size: 16px;
    color: #272536;

    .el-dropdown-link {
      color: $color_main;
    }

    .icon-font {
      font-weight: bold;
    }
  }
}

.navbar_container {
  .pop_mask {
    .el-dialog__header {
      border-bottom: 1px solid #f1f2f2;
      padding: 0 20px;
    }

    .el-dialog__title {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #707aff;
      line-height: 25px;
    }

    .tips {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0e1337;
    }

    .cancle_btn {
      width: 156px;
      height: 34px;
      background: #f5f6f9;
      border-radius: 4px;
      border: none;
    }

    .confirm_btn {
      width: 156px;
      height: 34px;
      background: $color_main;
      border-radius: 4px;
      border: none;
    }

    .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>
