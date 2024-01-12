/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'
const _import = file => () => import('@/views/' + file + '.vue')
const memberManage = {
  path: '/memberManage/',
  component: Layout,
  name: 'memberManage',
  meta: { label: '会员管理', icon: 'icon-huiyuan' },
  children: [
    {
      path: 'memberList',
      name: 'memberList',
      meta: {
        label: '会员管理'
      },
      component: _import('member/member/index')
    },
    {
      path: 'editMember',
      name: 'editMember',
      hidden: true,
      meta: {
        label: '会员新增/编辑'
      },
      component: _import('member/member/editMember')
    },
    {
      path: 'moneyList',
      name: 'moneyList',
      meta: {
        label: '会员金额记录'
      },
      component: _import('member/money/index')
    },
    {
      path: '/moneyDetail/:id',
      name: 'moneyDetail',
      hidden: true,
      meta: {
        label: '会员金额详情'
      },
      component: _import('member/money/detail')
    },
    {
      path: 'feedback',
      name: 'feedback',
      meta: {
        label: '意见反馈'
      },
      component: _import('member/feedback/index')
    },
    {
      path: 'upgrade',
      name: 'upgrade',
      meta: {
        label: '会员升级'
      },
      component: _import('member/upgrade/index')
    }
  ]
}
export default memberManage
