import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const _import = file => () => import('@/views/' + file + '.vue')
import Layout from '@/views/layout/Layout'
import page401 from '@/views/errorPage/401'
import page404 from '@/views/errorPage/404'
import systemManageRouter from './modules/systemManage'
import internetManageRouter from './modules/internetManage'
import copywritingManageRouter from './modules/copywritingManage'
import clearstockManageRouter from './modules/clearstockManage'
import contentManageRouter from './modules/contentManage'
import findgoodsManageRouter from './modules/findgoodsManage'
import memberManageRouter from './modules/memberManage'
import extensionManageRouter from './modules/extensionManage'
import errorRouter from './modules/errorPage'
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), name: 'login', hidden: true },
  // 首页
  {
    path: '/',
    is_menu: true,
    is_show_breadcrumb: false,
    meta: {
      icon: 'shouye',
      label: {
        'zh': '合伙人中心',
        'en': 'Partner Center'
      },
      is_cache: false
    },
    component: Layout,
    children: [
      {
        path: '',
        name: 'dashboard',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          label: {
            'zh': '合伙人中心',
            'en': 'Partner Center'
          },
          is_cache: false
        },
        component: _import('dashboard/index')
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        is_menu: false,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          label: {
            'zh': '修改密码',
            'en': 'Change Password'
          },
          is_cache: false
        },
        component: _import('dashboard/changePassword/index')
      }
    ]
  },
  // 用户列表
  // {
  //   path: '/memberManage',
  //   name: 'memberManage',
  //   is_menu: true,
  //   is_show_breadcrumb: false,
  //   meta: {
  //     icon: 'el-icon-user',
  //     label: '用户管理',
  //     is_cache: false
  //   },
  //   component: _import('layout/Layout'),
  //   children: [
  //     {
  //       path: 'memberList',
  //       name: 'memberList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '用户列表',
  //         is_cache: 0
  //       },
  //       component: _import('member/list')
  //     },
  //     {
  //       path: 'authList',
  //       name: 'authList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '实名认证审核',
  //         is_cache: 0
  //       },
  //       component: _import('member/authList')
  //     },
  //     {
  //       path: 'authDetail',
  //       name: 'authDetail',
  //       is_menu: false,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '实名认证详情',
  //         is_cache: 0
  //       },
  //       component: _import('member/authDetail')
  //     },
  //     {
  //       path: 'tradeList',
  //       name: 'tradeList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '交易汇总',
  //         is_cache: 0
  //       },
  //       component: _import('member/tradeList')
  //     },
  //     {
  //       path: 'balanceList',
  //       name: 'balanceList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '持仓汇总',
  //         is_cache: 0
  //       },
  //       component: _import('member/balanceList')
  //     },
  //     {
  //       path: 'coinList',
  //       name: 'coinList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '币种汇总',
  //         is_cache: 0
  //       },
  //       component: _import('member/coinList')
  //     },
  //     {
  //       path: 'dataList',
  //       name: 'dataList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '流水汇总',
  //         is_cache: 0
  //       },
  //       component: _import('member/dataList')
  //     },
  //     {
  //       path: 'czList',
  //       name: 'czList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '充值列表',
  //         is_cache: 0
  //       },
  //       component: _import('member/czList')
  //     },
  //     {
  //       path: 'withdrawList',
  //       name: 'withdrawList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '提现列表',
  //         is_cache: 0
  //       },
  //       component: _import('member/withdrawList')
  //     },
  //     // {
  //     //   path: 'txOrder',
  //     //   name: 'txOrder',
  //     //   is_menu: true,
  //     //   is_show_breadcrumb: false,
  //     //   meta: {
  //     //     icon: 'default',
  //     //     label: '提现订单',
  //     //     is_cache: false
  //     //   },
  //     //   component: _import('order/tx')
  //     // }
  //   ]
  // },
  {
    path: '/partnerManage',
    name: 'partnerManage',
    is_menu: true,
    is_show_breadcrumb: false,
    meta: {
      icon: 'yonghu',
      label: {
        'zh': '用户管理',
        'en': 'User Management'
      },
      is_cache: false
    },
    component: _import('layout/Layout'),
    children: [

      {
        path: 'partnerNext',
        name: 'partnerNext',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          label: {
            'zh': '邀请用户管理',
            'en': 'Invited Users'
          },
          is_cache: 0
        },
        component: _import('partner/partnerNext')
      },
      {
        path: 'directPartner',
        name: 'directPartner',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          label: {
            'zh': '直客管理',
            'en': 'Direct Users'
          },
          is_cache: 0
        },
        component: _import('partner/directPartner')
      },
      {
        path: 'partnerList',
        name: 'partnerList',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '合伙人管理',
          label: {
            'zh': '合伙人管理',
            'en': 'Partner Management'
          },
          is_cache: 0
        },
        component: _import('partner/partnerList')
      },
      {
        path: 'partnerTable',
        name: 'partnerTable',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '合伙人报表',
          label: {
            'zh': '合伙人报表',
            'en': 'Partner Report'
          },
          is_cache: 0
        },
        component: _import('partner/partnerTable')
      },


      // {
      //   path: 'commissionList',
      //   name: 'commissionList',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '返佣记录',
      //     is_cache: 0
      //   },
      //   component: _import('partner/commissionList')
      // },
      // {
      //   path: 'cmsDetail',
      //   name: 'cmsDetail',
      //   is_menu: false,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '轮播编辑',
      //     is_cache: 0
      //   },
      //   component: _import('content/cms/cmsDetail')
      // },
      // {
      //   path: 'noticeList',
      //   name: 'noticeList',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '公告列表',
      //     is_cache: 0
      //   },
      //   component: _import('content/notice/noticeList')
      // },

      // {
      //   path: 'noticeDetail',
      //   name: 'noticeDetail',
      //   is_menu: false,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '公告详情',
      //     is_cache: 0
      //   },
      //   component: _import('content/notice/noticeDetail')
      // },
    ]
  },
  {
    path: '/userAssetsManage',
    name: 'userAssetsManage',
    is_menu: true,
    is_show_breadcrumb: false,
    meta: {
      icon: 'zichan',
      label: {
        zh: '用户资产管理',
        en: 'User Assets'
      },
      is_cache: false
    },
    component: _import('layout/Layout'),
    children: [
      {
        path: 'exchangeAccount',
        name: 'exchangeAccount',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '钱包资产管理',
          label: {
            zh: '现货资产管理',
            en: 'Spot Assets'
          },
          is_cache: 0
        },
        component: _import('userAssets/exchangeAccount')
      },
      {
        path: 'exchangeAccountDetail',
        name: 'exchangeAccountDetail',
        is_menu: false,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          label: '资产明细',
          label: {
            zh: '资产明细',
            en: 'Spot Assets Details'
          },
          is_cache: 0
        },
        component: _import('userAssets/exchangeAccountDetail')
      },
      {
        path: 'futuresAccount',
        name: 'futuresAccount',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '永续合约资产管理',
          label: {
            zh: '永续合约资产管理',
            en: 'Contract Assets'
          },
          is_cache: 0
        },
        component: _import('userAssets/futuresAccount')
      },
      // {
      //   path: 'otcAccount',
      //   name: 'otcAccount',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     // label: '法币资产管理',
      //     label: {
      //       zh: '法币资产管理',
      //       en: 'Fiat Asset'
      //     },
      //     is_cache: 0
      //   },
      //   component: _import('userAssets/otcAccount')
      // },
      {
        path: 'otcAccountDetail',
        name: 'otcAccountDetail',
        is_menu: false,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '交易明细',
          label: {
            zh: '交易明细',
            en: 'Transaction Details'
          },
          is_cache: 0
        },
        component: _import('userAssets/otcAccountDetail')
      },
      // {
      //   path: 'otcTradeRecord',
      //   name: 'otcTradeRecord',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: {
      //       zh: '法币交易记录',
      //       en: 'Fiat Transaction Records'
      //     },
      //     // label: 'Fiat Transaction Records',
      //     is_cache: 0
      //   },
      //   component: _import('userAssets/otcTradeRecord')
      // },
      // {
      //   path: 'withdrawList',
      //   name: 'withdrawList',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '提币记录',
      //     is_cache: 0
      //   },
      //   component: _import('moneyRecord/withdrawList')
      // },

    ]
  },
  {
    path: '/moneyRecordManage',
    name: 'moneyRecordManage',
    is_menu: true,
    is_show_breadcrumb: false,
    meta: {
      icon: 'zhangdan',
      // label: '出入金记录',
      label: {
        zh: '出入金记录',
        en: 'Deposit Withdraw'
      },
      is_cache: false
    },
    component: _import('layout/Layout'),
    children: [
      {
        path: 'depositList',
        name: 'depositList',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '充值记录',
          label: {
            zh: '充值记录',
            en: 'Deposit record'
          },
          is_cache: 0
        },
        component: _import('moneyRecord/depositList')
      },
      {
        path: 'withdrawList',
        name: 'withdrawList',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '提币记录',
          label: {
            zh: '提币记录',
            en: 'Withdraw record'
          },
          is_cache: 0
        },
        component: _import('moneyRecord/withdrawList')
      },

    ]
  },
  {
    path: '/moneyManage',
    name: 'moneyManage',
    is_menu: true,
    is_show_breadcrumb: false,
    meta: {
      icon: 'fanyong',
      label: {
        'zh': '佣金管理',
        'en': 'Commission'
      },
      is_cache: false
    },
    component: _import('layout/Layout'),
    children: [
      {
        path: 'commissionList',
        name: 'commissionList',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          label: {
            'zh': '佣金记录',
            'en': 'Commission Record'
          },
          is_cache: 0
        },
        component: _import('money/commissionList')
      },
      {
        path: 'commissionDetail',
        name: 'commissionDetail',
        is_menu: false,
        is_show_breadcrumb: false,
        meta: {
          icon: 'el-icon-coin',
          label: {
            'zh': '佣金明细',
            'en': 'Commission details'
          },
          is_cache: 0
        },
        component: _import('money/commissionDetail')
      },
      {
        path: 'invalidOrder',
        name: 'invalidOrder',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          label: {
            'zh': '无效订单记录',
            'en': 'Invalid Order'
          },
          is_cache: 0
        },
        component: _import('money/invalidOrder')
      },
      // {
      //   path: 'cmsDetail',
      //   name: 'cmsDetail',
      //   is_menu: false,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '轮播编辑',
      //     is_cache: 0
      //   },
      //   component: _import('content/cms/cmsDetail')
      // },
      // {
      //   path: 'noticeList',
      //   name: 'noticeList',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '公告列表',
      //     is_cache: 0
      //   },
      //   component: _import('content/notice/noticeList')
      // },

      // {
      //   path: 'noticeDetail',
      //   name: 'noticeDetail',
      //   is_menu: false,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '公告详情',
      //     is_cache: 0
      //   },
      //   component: _import('content/notice/noticeDetail')
      // },
    ]
  },


  {
    path: '/contarctManage',
    name: 'contarctManage',
    is_menu: true,
    is_show_breadcrumb: false,
    meta: {
      icon: 'heyue',
      // label: '合约交易管理',
      label: {
        zh: '交易管理',
        en: 'Trade'
      },
      is_cache: false
    },
    component: _import('layout/Layout'),
    children: [
      {
        path: 'positionList',
        name: 'positionList',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '合约持仓查询',
          label: {
            zh: '合约当前持仓',
            en: 'Contract Position'
          },
          is_cache: 0
        },
        component: _import('contract/positionList')
      },
      {
        path: 'contractOrderList',
        name: 'contractOrderList',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '当前委托查询',
          label: {
            zh: '合约当前委托',
            en: 'Current Order'
          },
          is_cache: 0
        },
        component: _import('contract/orderList')
      },
      {
        path: 'contractHistoryOrderList',
        name: 'contractHistoryOrderList',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          label: {
            zh: '合约历史委托',
            en: 'History Order'
          },
          is_cache: 0
        },
        component: _import('contract/historyOrderList')
      },
      // {
      //   path: 'contractCloseOrderList',
      //   name: 'contractCloseOrderList',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     // label: '平仓委托查询',
      //     label:{
      //       zh:'平仓委托查询',
      //       en:'Close Order'
      //     },
      //     is_cache: 0
      //   },
      //   component: _import('contract/closeOrderList')
      // },
      {
        path: 'contractSuccessOrderList',
        name: 'contractSuccessOrderList',
        is_menu: true,
        is_show_breadcrumb: false,
        meta: {
          icon: 'default',
          // label: '成交记录查询',
          label: {
            zh: '成交记录查询',
            en: 'Success Order'
          },
          is_cache: 0
        },
        component: _import('contract/successOrderList')
      },
      // {
      //   path: 'contractSuccessOrderListSum',
      //   name: 'contractSuccessOrderListSum',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     // label: '成交汇总查询',
      //     label:{
      //       zh:'成交汇总查询',
      //       en:'Transaction Summary'
      //     },
      //     is_cache: 0
      //   },
      //   component: _import('contract/successOrderListSum')
      // },
      // {
      //   path: 'commissionDetail',
      //   name: 'commissionDetail',
      //   is_menu: false,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'el-icon-coin',
      //     label: '合约返佣明细',
      //     is_cache: 0
      //   },
      //   component: _import('money/commissionDetail')
      // },
      // {
      //   path: 'cmsDetail',
      //   name: 'cmsDetail',
      //   is_menu: false,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '轮播编辑',
      //     is_cache: 0
      //   },
      //   component: _import('content/cms/cmsDetail')
      // },
      // {
      //   path: 'noticeList',
      //   name: 'noticeList',
      //   is_menu: true,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '公告列表',
      //     is_cache: 0
      //   },
      //   component: _import('content/notice/noticeList')
      // },

      // {
      //   path: 'noticeDetail',
      //   name: 'noticeDetail',
      //   is_menu: false,
      //   is_show_breadcrumb: false,
      //   meta: {
      //     icon: 'default',
      //     label: '公告详情',
      //     is_cache: 0
      //   },
      //   component: _import('content/notice/noticeDetail')
      // },
    ]
  },
  // // 广告管理
  // {
  //   path: '/noticeManage',
  //   name: 'noticeManage',
  //   is_menu: true,
  //   is_show_breadcrumb: false,
  //   meta: {
  //     icon: 'el-icon-bell',
  //     label: '广告通知管理',
  //     is_cache: false
  //   },
  //   component: _import('layout/Layout'),
  //   children: [
  //     {
  //       path: 'cmsList',
  //       name: 'cmsList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '首页轮播',
  //         is_cache: 0
  //       },
  //       component: _import('content/cms/index')
  //     },
  //     {
  //       path: 'cmsDetail',
  //       name: 'cmsDetail',
  //       is_menu: false,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '轮播编辑',
  //         is_cache: 0
  //       },
  //       component: _import('content/cms/cmsDetail')
  //     },
  //     {
  //       path: 'noticeList',
  //       name: 'noticeList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '公告列表',
  //         is_cache: 0
  //       },
  //       component: _import('content/notice/noticeList')
  //     },

  //     {
  //       path: 'noticeDetail',
  //       name: 'noticeDetail',
  //       is_menu: false,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '公告详情',
  //         is_cache: 0
  //       },
  //       component: _import('content/notice/noticeDetail')
  //     },

  //     // {
  //     //   path: 'txOrder',
  //     //   name: 'txOrder',
  //     //   is_menu: true,
  //     //   is_show_breadcrumb: false,
  //     //   meta: {
  //     //     icon: 'default',
  //     //     label: '提现订单',
  //     //     is_cache: false
  //     //   },
  //     //   component: _import('order/tx')
  //     // }
  //   ]
  // },
  // // 跟单管理
  // {
  //   path: '/traderOrderManage',
  //   name: 'traderOrderManage',
  //   is_menu: true,
  //   is_show_breadcrumb: false,
  //   meta: {
  //     icon: 'el-icon-s-order',
  //     label: '跟单管理',
  //     is_cache: false
  //   },
  //   component: _import('layout/Layout'),
  //   children: [
  //     {
  //       path: 'followOrderUserList',
  //       name: 'followOrderUserList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '交易员列表',
  //         is_cache: 0
  //       },
  //       component: _import('traderOrder/followOrderUserList')
  //     },
  //     {
  //       path: 'followOrderUserDetail',
  //       name: 'followOrderUserDetail',
  //       is_menu: false,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '跟单详情',
  //         is_cache: 0
  //       },
  //       component: _import('traderOrder/followOrderUserDetail')
  //     },
  //     {
  //       path: 'followUserList',
  //       name: 'followUserList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '跟单员列表',
  //         is_cache: 0
  //       },
  //       component: _import('traderOrder/followUserList')
  //     },
  //     {
  //       path: 'applyTraderList',
  //       name: 'applyTraderList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '交易员申请',
  //         is_cache: 0
  //       },
  //       component: _import('traderOrder/applyTraderList')
  //     },
  //     {
  //       path: 'followOrderList',
  //       name: 'followOrderList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '订单列表',
  //         is_cache: 0
  //       },
  //       component: _import('traderOrder/followOrderList')
  //     },

  //     // {
  //     //   path: 'txOrder',
  //     //   name: 'txOrder',
  //     //   is_menu: true,
  //     //   is_show_breadcrumb: false,
  //     //   meta: {
  //     //     icon: 'default',
  //     //     label: '提现订单',
  //     //     is_cache: false
  //     //   },
  //     //   component: _import('order/tx')
  //     // }
  //   ]
  // },
  // // 系统配置
  // {
  //   path: '/systemManage',
  //   name: 'systemManage',
  //   is_menu: true,
  //   is_show_breadcrumb: false,
  //   meta: {
  //     icon: 'el-icon-setting',
  //     label: '系统管理',
  //     is_cache: false
  //   },
  //   component: _import('layout/Layout'),
  //   children: [
  //     {
  //       path: 'systemList',
  //       name: 'systemList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '参数配置',
  //         is_cache: 0
  //       },
  //       component: _import('system/system/list')
  //     },
  //     {
  //       path: 'languageList',
  //       name: 'languageList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '语言配置',
  //         is_cache: 0
  //       },
  //       component: _import('system/language/list')
  //     },
  //     // {
  //     //   path: 'txOrder',
  //     //   name: 'txOrder',
  //     //   is_menu: true,
  //     //   is_show_breadcrumb: false,
  //     //   meta: {
  //     //     icon: 'default',
  //     //     label: '提现订单',
  //     //     is_cache: false
  //     //   },
  //     //   component: _import('order/tx')
  //     // }
  //   ]
  // },
  // {
  //   path: '/walletManage',
  //   name: 'walletManege',
  //   is_menu: true,
  //   is_show_breadcrumb: false,
  //   meta: {
  //     icon: 'el-icon-wallet',
  //     label: '钱包管理',
  //     is_cache: false
  //   },
  //   component: _import('layout/Layout'),
  //   children: [
  //     {
  //       path: 'walletSymbolList',
  //       name: 'walletSymbolList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '币种管理',
  //         is_cache: false
  //       },
  //       component: _import('wallet/symbol/symbolList')
  //     },
  //     {
  //       path: 'walletList',
  //       name: 'walletList',
  //       is_menu: false,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '钱包信息',
  //         is_cache: false
  //       },
  //       component: _import('wallet/wallet/list')
  //     },
  //     {
  //       path: 'walletSymbolEdit',
  //       name: 'walletSymbolEdit',
  //       is_menu: false,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '币种编辑',
  //         is_cache: false
  //       },
  //       component: _import('wallet/symbol/editSymbol')
  //     },
  //     // {
  //     //   path: 'aggList',
  //     //   name: 'aggList',
  //     //   is_menu: true,
  //     //   is_show_breadcrumb: false,
  //     //   meta: {
  //     //     icon: 'default',
  //     //     label: '归集列表',
  //     //     is_cache: false
  //     //   },
  //     //   component: _import('wallet/agg/aggList')
  //     // },
  //     // {
  //     //   path: 'centerList',
  //     //   name: 'centerList',
  //     //   is_menu: true,
  //     //   is_show_breadcrumb: false,
  //     //   meta: {
  //     //     icon: 'default',
  //     //     label: '地址总交易情况',
  //     //     is_cache: false
  //     //   },
  //     //   component: _import('wallet/agg/centerList')
  //     // },
  //     // {
  //     //   path: 'energyList',
  //     //   name: 'energyList',
  //     //   is_menu: true,
  //     //   is_show_breadcrumb: false,
  //     //   meta: {
  //     //     icon: 'default',
  //     //     label: '燃料列表',
  //     //     is_cache: false
  //     //   },
  //     //   component: _import('wallet/energy/list')
  //     // },
  //     {
  //       path: 'addressList',
  //       name: 'addressList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '地址列表',
  //         is_cache: false
  //       },
  //       component: _import('wallet/address/list')
  //     },
  //     {
  //       path: 'bookList',
  //       name: 'bookList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '币种账单',
  //         is_cache: 0
  //       },
  //       component: _import('wallet/book/list')
  //     },
  //     {
  //       path: 'bookDetail',
  //       name: 'bookDetail',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '账单明细',
  //         is_cache: 0
  //       },
  //       component: _import('wallet/book/detail')
  //     }
  //   ]
  // }
  // 用户管理
  // {
  //   path: '/userManage',
  //   name: 'userManage',
  //   is_menu: true,
  //   is_show_breadcrumb: false,
  //   meta: {
  //     icon: 'el-icon-user',
  //     label: '用户管理',
  //     is_cache: false
  //   },
  //   component: _import('layout/Layout'),
  //   children: [
  //     {
  //       path: 'userList',
  //       name: 'userList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '用户列表',
  //         is_cache: false
  //       },
  //       component: _import('user/userInfoList')
  //     },
  //     {
  //       path: 'userRole',
  //       name: 'userRole',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '角色管理',
  //         is_cache: false
  //       },
  //       component: _import('user/role')
  //     },
  //     {
  //       path: 'roleRouter',
  //       name: 'roleRouter',
  //       is_menu: false,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '角色路由编辑',
  //         is_cache: false
  //       },
  //       component: _import('user/roleRouter')
  //     },
  //     {
  //       path: 'menuList',
  //       name: 'menuList',
  //       is_menu: true,
  //       is_show_breadcrumb: false,
  //       meta: {
  //         icon: 'default',
  //         label: '路由管理',
  //         is_cache: false
  //       },
  //       component: _import('user/menuList')
  //     }
  //   ]
  // }
]
export default new Router({
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/error',
    component: _import('layout/Layout'),
    name: 'ErrorPages',
    label: 'errorPages',
    icon: 'icon-template',
    hidden: true,
    children: [
      {
        path: '401', component: page401, name: 'Menu401', label: 'page401', noCache: true, meta: {
          icon: 'default',
          label: 'page401',
          is_cache: false
        }
      },
      {
        path: '404', component: page404, name: 'Menu404', label: 'page404', noCache: true,
        meta: {
          icon: 'default',
          label: 'page404',
          is_cache: false
        }
      }
    ]
  },
  { path: '*', redirect: '/error/404', hidden: true }
]
