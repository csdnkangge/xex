<template>
  <div class="index_container">
    <div class="account_info_section" v-if="formData.username">
      <div class="section_title">
        <div class="line"></div>
        <!-- 账户概览 -->
        {{ $t("index.account_title") }}
      </div>
      <div class="section_main">
        <div class="card_item account_item">
          <div class="item_title">
            {{ $t("index.account") }}:{{ formData.username }}
          </div>
          <div class="item_main rate_main">
            <div class="my_rate">{{ formData.myRate }}%</div>
            <div class="desc">{{ $t("index.commission_ratio") }}</div>
          </div>
          <!-- <div class="bg"></div> -->
        </div>
        <div class="card_item reback_item" @click="dialogVisible['money'] = true">
          <div class="total_reback">
            <span>{{ $t("index.cumulative_rebate_amount") }}(USDT)</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="val ">{{ formData.alreadySettled }}</div>
          <div class="last_day ">
            {{ $t("index.yesterday") }}： +<span class="DP-Medium">{{
              formData.lastSettlement
            }}</span>
          </div>
          <div class="icon_box">
            <img :src="icon1" class='icon1' />
          </div>
        </div>
        <!-- <div class="card_item invite_item">
          <div class="invite_title">{{ $t("index.invited_users_number") }}</div>
          <div class="val DP-Bold">{{ formData.allNextAgent }}</div>
          <div class="today">
            {{ $t("index.today") }}：+<span class="DP-Medium">{{
              formData.allTodayNextAgent
            }}</span>
          </div>
          <div class="icon_box">
            <i class="icon-font icon-yaoqing"></i>
          </div>
        </div> -->
        <div class="card_item next_item">
          <div class="next_title">{{ $t("index.direct_next_agent") }}</div>
          <div class="val">{{ formData.directNextAgent }}</div>
          <div class="today">
            {{ $t("index.today") }}：+<span class="DP-Medium">{{
              formData.directTodayNextAgent
            }}</span>
          </div>
          <div class="icon_box">
            <img :src="icon2" class='icon2' />
          </div>
        </div>
      </div>
    </div>
    <div class="mainBottomSection">
      <!-- 资金概览 -->
      <div class="money_info_section">
        <div class="section_title">
          <span class="point"></span>{{ $t("index.funding_title") }}
        </div>
        <div class="money_main_info">
          <div class="money_item leftSection">
            <div class="icon">
              <img :src="icon3" />
            </div>
            <div class="title">
              <!-- 节点总净盈亏 -->
              {{ $t("index.jdzjyk") }}
              <el-tooltip class="item" effect="light" content="总净盈亏=总结算盈亏+总手续费" placement="right" popper-class="toolpop">
                <i class="icon-font icon-yiwen"></i>
              </el-tooltip>
              <!-- <span class="tips">({{ $t("index.update_times") }})</span> -->
            </div>
            <div class="total_val">
              {{ profitInfo.totalProfit }} <span class="">USDT</span>
            </div>
            <div class="bottom_section">
              <div class="left">
                <div class="total_yk">{{ $t("index.zjsyk") }}</div>
                <div class="val ">
                  {{ profitInfo.totalAmount }} <span>USDT</span>
                </div>
              </div>
              <div class="right">
                <div class="total_free">{{ $t("index.total_fee") }}</div>
                <div class="val">
                  {{ profitInfo.totalFee }} <span>USDT</span>
                </div>
              </div>
            </div>
          </div>
          <div class="money_item rightSection">
            <div class="icon">
              <img :src="icon4" />
            </div>
            <div class="title">
              <!-- 总净入金 -->
              {{ $t("index.total_net_deposit") }}
            </div>
            <div class="total_val DP-Bold">
              {{ incomeprofitInfo.totalProfit }}
              <span class="DP-Medium">USDT</span>
            </div>
            <div class="bottom_section">
              <div class="left">
                <div class="total_yk">{{ $t("index.total_deposit") }}</div>
                <div class="val DP-Medium">
                  {{ incomeprofitInfo.deposit }} <span>USDT</span>
                </div>
              </div>
              <div class="right">
                <div class="total_free">{{ $t("index.total_withdraw") }}</div>
                <div class="val DP-Medium">
                  {{ incomeprofitInfo.withdraw }} <span>USDT</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 净充值 -->
          <!-- <div class="money_item">
            <div class="title">              
              {{ $t("index.net_recharge") }}
            </div>
            <div class="total_val DP-Bold">
              {{ incomeprofitInfo.total }}
              <span class="DP-Medium">USDT</span>
            </div>
            <div class="bottom_section">
              <div class="left">
                <div class="total_yk">{{ $t("index.total_deposit") }}</div>
                <div class="val DP-Medium">
                  {{ incomeprofitInfo.deposit }} <span>USDT</span>
                </div>
              </div>
              <div class="center">
                <div class="total_yk">{{ $t("index.fiat_deposit") }}</div>
                <div class="val DP-Medium">
                  {{ incomeprofitInfo.otcDeposit }} <span>USDT</span>
                </div>
              </div>
              <div class="right">
                <div class="total_free">{{ $t("index.total_withdraw") }}</div>
                <div class="val DP-Medium">
                  {{ incomeprofitInfo.withdraw }} <span>USDT</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <!-- 邀请用户 -->
      <div class="invite_info_section" v-if="inviteInfo.inviteCode">
        <div class="section_title">
          <span class="point"></span>{{ $t("index.invite_users") }}
        </div>
        <div class="invite_main_section">
          <div class="qr_code_section">
            <div class="title_line">
              <div class="title">{{ $t("index.invite_qr_code") }}</div>
              <div class="copy_btn">
                <a v-if="!isFirefox" @click.stop.prevent="handleDownloadQrIMg" class="qrcode">
                  <i class="icon-font icon-xiazai1"></i>
                </a>
                <a v-if="isFirefox" :href="inviteInfo.inviteQECode" download="inviteQRCode.png" class="qrcode">
                  <i class="icon-font icon-xiazai1"></i>
                </a>
              </div>
            </div>
            <div class="qrcode_box">
              <img :src="inviteInfo.inviteQECode" alt="" />
            </div>
          </div>
          <div class="poster_section">
            <div class="title_line">
              <div class="title">{{ $t("index.invite_poster") }}</div>
            </div>
            <div class="poster_main">
              <div class="poster_btn" @click="dialogVisible['poster'] = true">
                {{ $t("index.download_poster") }}
              </div>
            </div>
          </div>
          <div class="rightCodeSection">
            <div class="code_section">
              <div class="title_line">
                <div class="title">{{ $t("index.invite_code") }}</div>

              </div>
              <div class="code" id="inviteCode">
                <span>{{ inviteInfo.inviteCode }}</span>
                <div class="copy_btn" @click="handleCopy('inviteCode')">
                  <i class="icon-font icon-fuzhi1"></i>
                </div>
              </div>
            </div>
            <div class="link_section">
              <div class="title_line">
                <div class="title">{{ $t("index.invite_link") }}</div>
              </div>
              <div class="code" id="inviteUrl">
                <span>{{ inviteInfo.inviteUrl }}</span>
                <div class="copy_btn" @click="handleCopy('inviteUrl')">
                  <i class="icon-font icon-fuzhi1"></i>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible['money']" custom-class="commissionPop" width="741px" center>
      <div class="pop_title" slot="title">
        <span class="point"></span>{{ $t("index.commission_statistics") }}
      </div>
      <div class="pop_card_item">
        <div class="left">
          <div class="item_title">{{ $t("index.sjszqfyze") }}</div>
          <div class="val">
            {{ formData.alreadySettled || "0" }}
            <span class="DP-Medium">USDT</span>
          </div>
        </div>
        <div class="right">
          <div class="item_title">{{ $t("index.settlement_time") }}</div>
          <div class="time">
            {{ formatTime("", "", formData.alreadySettledDate) }}
          </div>
        </div>
      </div>
      <div class="pop_card_item">
        <div class="left">
          <div class="item_title">{{ $t("index.bjszqfyze") }}</div>
          <div class="val ">
            {{ formData.alreadySettled + formData.unsettlement || 0 }}
            <span class="DP-Medium">USDT</span>
          </div>
        </div>
        <div class="right">
          <div class="item_title">{{ $t("index.settlement_time") }}</div>
          <div class="time">
            {{ formatTime("", "", formData.unsettlementDate) }}
          </div>
        </div>
      </div>
      <div class="pop_card_item">
        <div class="left">
          <div class="item_title">{{ $t("index.wjsfyje") }}</div>
          <div class="val">
            {{ formData.unsettlement || "0" }}
            <span class="DP-Medium">USDT</span>
          </div>
        </div>
        <div class="right">
          <div class="item_title">{{ $t("index.next_settlement_time") }}</div>
          <div class="time">
            {{ formatTime("", "", formData.nextSettledDate) }}
          </div>
        </div>
      </div>
      <div class="pop_bottom_item">
        <div class="left">{{ $t("index.bljszqxzfye") }}</div>
        <div class="right">
          {{ formData.unsettlement || "0" }} <span>USDT</span>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible['poster']" custom-class="poster_mask" center width="468px">
      <div class="poster_title" slot="title">
        <div class="left">
          <el-select class="lan_select" popper-class="lan_item" v-model="poster.type" :placeholder="$t('choose')">
            <el-option :label="$t('index.zh')" value="0" />
            <el-option :label="$t('index.en')" value="1" />
          </el-select>
        </div>
        <div class="title">
          <span class="point"></span>{{ $t("index.download_poster") }}
        </div>
      </div>
      <div class="poster_main">
        <div class="poster_item" v-for="(item, index) in poster.list[poster.type]" :key="index">
          <div class="poster_box" :id="'poster_' + index">
            <img :src="item" class="poster" alt="" />
            <div class="user_info">
              <!-- <div class="left">
                <div class="user_name DP-Bold">{{ formData.username }}</div>
                <div class="desc">
                  {{
                    poster.type === "0"
                    ? "邀请您加入【Taucoin】，长按识别二维码"
                    : "Trade anywhere Download the Taucoin app"
                  }}
                </div>
              </div> -->
              <div class="qrcode_section">
                <img :src="inviteInfo.inviteQECode" alt="" class="poster_qr_code" />
              </div>
            </div>
          </div>
          <!-- <div class="check_section">
            <img @click="check_poster = index" :src="check_poster === index ? check : no_check" alt="" />
          </div> -->
        </div>
      </div>
      <div class="btn_box" slot="footer">
        <el-button class="poster_copy btn" id="generateAndCopyBtn" @click="handleCopyPoster">{{
          $t("index.copy")
        }}</el-button>
        <el-button class="poster_download btn" @click="downloadPoster">{{
          $t("index.download")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from "@/api/partner/partner";
import page from "@/components/Page";
import ch_1 from "@/assets/images/poster/ch_1.png";
import ch_2 from "@/assets/images/poster/ch_2.png";
import en_1 from "@/assets/images/poster/en_1.png";
import en_2 from "@/assets/images/poster/en_2.png";
import icon1 from "@/assets/images/icons/icon-1.png";
import icon2 from "@/assets/images/icons/icon-2.png";
import icon3 from "@/assets/images/icons/icon-3.png";
import icon4 from "@/assets/images/icons/icon-4.png";
import check from "@/assets/images/xuanzhong.png";
import no_check from "@/assets/images/weixuanzhong.png";
import { timeFormat } from "@/utils/index";
import html2canvas from "html2canvas";
import ClipboardJS from 'clipboard';
export default {
  data () {
    return {
      check,
      no_check,
      icon1,
      icon2,
      icon3,
      icon4,
      formData: {},
      table_work_data: [],
      table_work_loading: false,
      table_work_total: 0,
      tableLoading: false,
      tableData: [],
      dialogVisible: {
        money: false,
        poster: false
      },
      inviteInfo: {},
      profitInfo: {},
      profitTimer: null,
      incomeprofitInfo: {},
      check_poster: 0,
      posterUrl: "",
      poster: {
        type: "0",
        list: [
          [ch_1],
          [en_1]
        ]
      }
    };
  },
  components: { page },
  computed: {
    isFirefox () {
      return navigator.userAgent.indexOf("Firefox") > 0;
    }
  },
  created () {
    this.getData();
  },
  destroyed () {
    clearTimeout(this.profitTimer);
  },
  methods: {
    // 时间格式转化
    formatTime (row, col, val) {
      return timeFormat(val);
    },
    getData () {
      Api.getStaticInfo().then(res => {
        // console.log(res)
        this.formData = res.data;
        this.tableData = [{ ...res.data }];
      });
      // 邀请信息
      Api.getInviteInfo().then(res => {
        this.inviteInfo = res.data;
      });
      // 资金盈亏
      this.getProFitInfo();

      // 总净入金
      Api.getIncomeprofitInfo().then(res => {
        this.incomeprofitInfo = res.data;
      });
    },
    getProFitInfo () {
      Api.getProFitInfo().then(res => {
        this.profitInfo = res.data;
        this.profitTimer = setTimeout(() => {
          this.getProFitInfo();
        }, 300000);
      });
    },
    // 复制邀请链接，邀请码
    handleCopy (id) {
      const range = document.createRange();
      // 创建range对象;
      range.selectNode(document.getElementById(id)); //获取复制内容的 id 选择器
      const selection = window.getSelection(); //创建 selection对象
      if (selection.rangeCount > 0) selection.removeAllRanges(); //如果页面已经有选取了的话，会自动删除这个选区，没有选区的话，会把这个选取加入选区
      selection.addRange(range); //将range对象添加到selection选区当中，会高亮文本块
      document.execCommand("copy"); //复制选中的文字到剪贴板
      this.$message({
        message: this.$t("index.copy_success"),
        type: "success"
      });
      selection.removeRange(range); // 移除选中的元素
    },
    handleCopyPoster () {
      let c = document.getElementById(`poster_${this.check_poster}`);
      let that = this
      html2canvas(c, {
        backgroundColor: null,
        useCORS: true
      }).then(canvas => {
        // const imageBase64 = canvas.toDataURL('image/png');
        // // 使用 Clipboard API 复制图片到剪贴板
        // const clipboard = new ClipboardJS('#generateAndCopyBtn', {
        //   text: function () {
        //     return imageBase64;
        //   },
        // })
        // // 复制成功的回调
        // clipboard.on('success', function () {
        //   that.$message({
        //     message: that.$t("index.copy_success"),
        //     type: "success"
        //   });
        // });

        // // 复制失败的回调
        // clipboard.on('error', function () {

        //   that.$message({
        //     message: that.$t("index.copy_failed"),
        //     type: "error"
        //   });
        // });
        var context = canvas.getContext("2d");
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        canvas.toBlob(
          function (data) {
            // clipboard.write 仅支持image/png的blob数据
            console.log(navigator)
            if (!navigator.clipboard) {
              return alert(that.$t('index.browser_no_support')); // 创建range区域
            }
            navigator.clipboard.write([
              new window.ClipboardItem({
                [data.type]: data
              })
            ]);
            that.$message({
              message: that.$t("index.copy_success"),
              type: "success"
            });
          },
          "image/png",
          1
        );

      });
    },
    // 下载海报
    downloadPoster () {
      let c = document.getElementById(`poster_${this.check_poster}`);
      html2canvas(c, {
        backgroundColor: null,
        useCORS: true
      }).then(canvas => {
        var context = canvas.getContext("2d");
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        this.posterUrl = canvas.toDataURL("image/png");

        let a = document.createElement("a");
        a.href = this.posterUrl;
        a.setAttribute("download", "invitePoster");
        a.click();
      });
    },
    // 下载二维码
    handleDownloadQrIMg () {
      // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
      const imgUrl = this.inviteInfo.inviteQECode;
      // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
      if (window.navigator.msSaveOrOpenBlob) {
        let bstr = atob(imgUrl.split(",")[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, "inviteQRCode" + "." + "png");
      } else {
        // 这里就按照chrome等新版浏览器来处理
        let a = document.createElement("a");
        a.href = imgUrl;
        a.setAttribute("download", "inviteQRCode");
        a.click();
      }
    }
  }
};
</script>
<style lang="scss">
$color_main: #707aff;

.index_container {
  .account_info_section {
    width: 100%;
    height: 218px;
    background: url('../../assets/images/index_bg.png');
    background-size: 100% 218px;
    background-repeat: no-repeat;
    border-radius: 4px;
    padding-left: 16px;
    padding-top: 20px;
    padding-right: 16px;

    .section_title {
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #fff;
      line-height: 33px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .line {
        width: 5px;
        height: 24px;
        background: #fff;
        border-radius: 3px;
        margin-right: 9px;
      }
    }

    .section_main {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      margin-top: 12px;



      .card_item {
        box-sizing: border-box;
        flex-shrink: 0;
        max-width: 394px;
        flex: 1;
        height: 133px;
        margin-right: 16px;
        box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
        border-radius: 8px;
        overflow: hidden;
        position: relative;

        .item_title {
          // background: #fff;
          line-height: 37px;
          height: 37px;
          // background: #ffffff;
          // border-radius: 8px 8px 0px 0px;
          color: $color_main;
          padding-left: 24px;
          font-size: 16px;
        }

        .item_main {
          text-align: center;
          // background: linear-gradient(135deg, #a9b2ff 0%, #707aff 100%);
          color: #fff;

          .my_rate {
            font-size: 30px;
            line-height: 42px;
            font-weight: 600;
            font-family: PingFangSC-Semibold, PingFang SC;
          }

          .desc {
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            line-height: 17px;
          }
        }

        .rate_main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 90px;
        }

        // .bg {
        //   position: absolute;
        //   right: 0;
        //   bottom: 0;
        //   width: 116px;
        //   height: 122px;
        //   background: linear-gradient(136deg, #707aff 0%, #a5acff 100%);
        //   box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
        // }
      }

      .account_item {
        background-image: url("../../assets/images/account_bg1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border: 6px solid #fff;
        border-radius: 8px;
        padding: 10px;

        .item_title {
          color: #fff;
          padding-left: 0;
          line-height: 22px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
        }
      }

      .reback_item {
        padding: 24px;
        cursor: pointer;
        position: relative;
        background: #fff;

        .icon1 {
          width: 88px;
        }

        .icon_box {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          // background: linear-gradient(136deg, #ff8045 0%, #ff4921 100%);
          color: #fff;
          // font-size: px !important;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon1 {
            width: 88px;
          }
        }

        .total_reback {
          color: #0e1337;
          font-size: 16px;
          line-height: 22px;
          font-weight: bold;

          i {
            font-weight: bold;
          }
        }

        .val {
          margin-top: 7px;
          color: #6C93FF;
          font-size: 26px;
          line-height: 37px;
          font-weight: bold;
          // margin-top: 8px;
        }

        .last_day {
          color: #6C93FF;
          font-size: 14px;
          // margin-top: 4px;
          line-height: 20px;
        }
      }

      .invite_item {
        padding: 24px;
        background: #fff;

        .icon_box {
          position: absolute;
          bottom: 24px;
          right: 24px;
          width: 47px;
          height: 47px;
          border-radius: 50%;
          background: linear-gradient(136deg, #1efae3 0%, #03d0b7 100%);
          color: #fff;
          // font-size: px !important;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon-font {
            font-size: 30px;
          }
        }

        .invite_title {
          color: #0e1337;
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 8px;
        }

        .val {
          color: #03d0b7;
          font-size: 26px;
          line-height: 33px;
        }

        .today {
          color: #03d0b7;
          font-size: 14px;
          line-height: 20px;
          margin-top: 4px;
        }
      }

      .next_item {
        padding: 24px;
        margin-right: 0;
        background: #fff;

        .icon_box {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          // background: linear-gradient(136deg, #ffc63e 0%, #ff8a12 100%);
          color: #fff;
          // font-size: px !important;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon2 {
            width: 88px;
          }
        }

        .next_title {
          color: #0e1337;
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .val {
          color: #0ADDCE;
          font-size: 26px;
          line-height: 37px;
        }

        .today {
          color: #0ADDCE;
          font-size: 14px;
          line-height: 20px;
          margin-top: 4px;
        }
      }
    }
  }

  .mainBottomSection {
    width: 100%;
    border-radius: 8px;
    background: #fff;
    padding: 24px 16px;
    margin-top: 8px;
  }

  .money_info_section {


    .section_title {
      display: flex;
      align-items: center;
      color: #6767b3;
      font-size: 18px;

      span {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #707aff;
        display: inline-block;
        margin-right: 8px;
      }
    }

    .money_main_info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 12px;

      .money_item.leftSection {
        position: relative;
        border: 1px solid #6C93FF;
        background: linear-gradient(225deg, #F1F5FF 0%, #F9FBFF 100%);

        .icon {
          position: absolute;
          right: 20px;
          top: 20px;
          width: 72px;

          img {
            width: 72px;
          }
        }
      }

      .money_item.rightSection {
        position: relative;
        border: 1px solid #976FFF;
        background: linear-gradient(225deg, #F6F2FF 0%, #FBFAFF 100%);

        .icon {
          position: absolute;
          right: 20px;
          top: 20px;
          width: 72px;

          img {
            width: 72px;
          }
        }
      }

      .money_item {
        max-width:598px;

        flex: 1;
        flex-shrink: 0;
        height: 205px;

        box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
        border-radius: 8px;
        padding: 24px;

        .title {
          color: #0e1337;
          font-size: 16px;
          line-height: 22px;
          font-weight: 500;
          margin-bottom: 8px;

          .tips {
            font-size: 12px;
          }
        }

        .total_val {
          color: #6C93FF;
          font-size: 26px;
          line-height: 33px;
          padding-bottom: 24px;
          border-bottom: 1px solid #dbddff;
          margin-bottom: 24px;

          span {
            font-size: 16px;
          }
        }

        .bottom_section {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          color: #6C93FF;

          .left,
          .center,
          .right {
            flex: 1;
            flex-shrink: 0;
          }

          .total_yk,
          .total_free {
            font-size: 14px;
            color: #0e1337;
            line-height: 20px;
            margin-bottom: 4px;
          }

          .val {
            font-size: 16px;
            // color: #707aff;
            line-height: 21px;

            span {
              font-size: 12px;
            }
          }
        }
      }

      .money_item:nth-child(2) {
        margin: 0 16px;

        .total_val {
          color: #976FFF;
        }

        .bottom_section {
          color: #976FFF;
        }
      }
    }
  }

  .invite_info_section {
    margin-top: 24px;

    .section_title {
      display: flex;
      align-items: center;
      color: #6767b3;
      font-size: 18px;

      span {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #707aff;
        display: inline-block;
        margin-right: 8px;
      }
    }

    .invite_main_section {
      margin-top: 12px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      .rightCodeSection {
        width: 290px;
        border-radius: 8px;
        box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
        background: #fff;
        padding: 0 10px;
      }

      .code_section {
        border-bottom: 1px solid #E6E6E6;

        .title_line {
          display: flex;
          color: #0E1337;
          font-size: 16px;
          line-height: 22px;
          padding: 8px 0 8px 14px;
        }

        .code {
          height: 54px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;

          color: #0E1337;
          font-size: 24px;
          padding: 12px 0px 12px 14px;
          border-radius: 0 0 8px 8px;

          .copy_btn {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #fff;
            color: #0E1337;
            line-height: 22px;
            text-align: center;
          }
        }
      }

      .link_section {


        .title_line {
          display: flex;
          color: #0E1337;
          font-size: 16px;
          line-height: 22px;
          padding: 15px 0 15px 14px;
        }

        .code {
          height: 54px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;

          color: #0E1337;
          font-size: 12px;
          padding: 12px 0px 12px 14px;
          border-radius: 0 0 8px 8px;

          .copy_btn {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #fff;
            color: #0E1337;
            line-height: 22px;
            text-align: center;
          }
        }
      }

      .qr_code_section {
        width: 160px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
        padding: 0 10px;

        .title_line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #0E1337;
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 16px;
          height: 37px;
          padding-left: 14px;
          border-bottom: 1px solid #E6E6E6;

          .copy_btn {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            color: #403E4D;
            line-height: 22px;
            text-align: center;
          }
        }

        .qrcode_box {
          width: 160px;
          background: #fff;
          display: flex;
          margin-left: -10px;
          padding: 1px 0;

          img {
            width: 100%;
          }
        }
      }

      .poster_section {
        width: 130px;
        margin: 0 16px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
        padding: 0 10px;

        .title_line {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #0E1337;
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 16px;
          height: 38px;
          text-align: center;
          border-bottom: 1px solid #E6E6E6;
        }

        .poster_main {
          height: 162px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;

          .poster_btn {
            width: 99px;
            // height: 28px;
            border-radius: 4px;
            color: #fff;
            background: linear-gradient(225deg, #DF69D1 0%, #976FFF 100%);
            font-size: 14px;
            line-height: 14px;
            padding: 5px 0;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }

  .pop_title {
    color: #fff;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 33px;
    display: flex;
    align-items: center;
    justify-content: center;

    .point {
      width: 9px;
      height: 9px;
      background: #fff;
      border-radius: 50%;
      display: inline-block;
      margin-right: 8px;
    }
  }

  .pop_card_item {
    width: 100%;
    height: 115px;
    background: #ffffff;
    box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
    border-radius: 8px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 24px;
    margin-bottom: 12px;

    .right {
      flex: 1;
      flex-shrink: 0;
    }

    .left {
      flex: 1;
      flex-shrink: 0;
    }

    .item_title {
      color: #0e1337;
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 12px;
    }

    .val,
    .time {
      color: #7473ff;
      font-size: 26px;
      font-weight: bold;
      font-family: PingFangSC-Semibold, PingFang SC;

      span {
        font-size: 16px;
        line-height: 21px;
        font-weight: normal;
      }
    }

    .right {
      padding-left: 24px;
    }
  }

  .pop_bottom_item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 73px;
    // background: linear-gradient(135deg, #a9b2ff 0%, #707aff 100%);
    background-image: url("../../assets/images/fanyong_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-shadow: 4px 4px 20px 0px rgba(66, 76, 218, 0.2);
    border-radius: 8px;
    padding: 24px;
    color: #fff;

    .left {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
    }

    .right {
      font-size: 18px;

      span {
        font-size: 14px;
        font-weight: 500;
        font-family: PingFangSC-Medium, PingFang SC;
      }
    }
  }

  .poster_title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;

    .point {
      width: 9px;
      height: 9px;
      background: #272536;
      border-radius: 5px;
      display: inline-block;
      margin-right: 8px;
    }

    .title {
      flex: 1;
      text-align: center;
      margin-left: -100px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lan_select {
      width: 100px;
      height: 22px;
      // margin-right: 60px;

      input {
        border-radius: 90px;
        height: 22px;
        line-height: 22px;
        padding-left: 10px;
        font-size: 14px;
        border: none;
        background: transparent;
        color: #7473FF;
        text-align: center;
      }

      .el-input__suffix {
        height: 22px;

        .el-input__icon {
          line-height: 22px;
          color: #7473FF;
        }
      }
    }
  }

  .lan_item {
    li {
      height: 22px;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .commissionPop {
    background: url('../../assets/images/commission_pop_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 8px;

    .el-icon-close {
      color: #fff;
      font-size: 24px;
    }

    .el-dialog__body {
      padding-top: 14px;
    }
  }

  .poster_mask {
    background: #f5f6ff;
    margin-top: 3vh !important;

    .el-dialog__body {
      padding-top: 15px;
    }
  }

  .poster_main {
    display: flex;
    justify-content: center;
    align-items: center;

    .poster_item {
      margin: 0 12px;

      .poster_box {
        position: relative;
        width: 375px;
        border-radius: 8px;
        overflow: hidden;
        background-color: transparent;

        // padding-top: 20px;
        img {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
        }

        .user_info {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          // background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;

          // .user_name {
          //   font-size: 18px;
          //   line-height: 24px;
          //   margin-bottom: 4px;
          //   color: #4b5687;
          // }

          // .desc {
          //   font-size: 12px;
          //   line-height: 16px;
          //   color: #a2a9bd;
          // }

          .qrcode_section {
            width: 50px;
            height: 50px;
            position: absolute;
            right: 19px;
            bottom: 9px;
          }
        }
      }

      .check_section {
        width: 375px;
        text-align: center;

        img {
          cursor: pointer;
          width: 25px;
          margin-top: 7px;
        }
      }
    }
  }

  .btn_box {
    margin-top: -10px;

    .poster_copy {
      border: 1px solid #7473FF;
      color: #7473FF;
      background: transparent;
    }

    .poster_download {
      border: none;
      background: linear-gradient(225deg, #DF69D1 0%, #976FFF 100%);
      color: #fff;
    }

    .btn {
      width: 156px;
      height: 37px;

      border-radius: 4px;


      span {
        font-size: 16px;
        // letter-spacing: 8px;
      }
    }
  }
}

.toolpop {
  border-color: #cdcdcd !important;

  .popper__arrow {
    border-right-color: #cdcdcd !important;
  }
}
</style>
