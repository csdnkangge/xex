/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'
const _import = file => () => import('@/views/' + file + '.vue')
const copywritingManage = {
  path: '/copywritingManage/',
  component: Layout,
  redirect: {
    name: 'copywritingCaseList'
  },
  name: 'copywritingManage',
  meta: { label: '文案管理', icon: 'icon-wenan' },
  children: [
    {
      path: 'copywritingCaseList',
      name: 'copywritingCaseList',
      meta: {
        label: '案例管理'
      },
      component: _import('copywriting/case/index')
    },
    {
      path: 'editCopywritingCase/:author_id/:category_id',
      name: 'editCopywritingCase',
      hidden: true,
      meta: {
        label: '案例新增/编辑'
      },
      component: _import('copywriting/case/editCase')
    },
    {
      path: 'copywritingPackagesList',
      name: 'copywritingPackagesList',
      meta: {
        label: '套餐管理'
      },
      component: _import('copywriting/packages/index')
    },
    {
      path: 'editCopywritingPackages',
      name: 'editCopywritingPackages',
      hidden: true,
      meta: {
        label: '套餐新增/编辑'
      },
      component: _import('copywriting/packages/editPackages')
    },
    {
      path: 'copywritingOrderList',
      name: 'copywritingOrderList',
      meta: {
        label: '订单管理'
      },
      component: _import('copywriting/order/index')
    },
    {
      path: 'editCopywritingOrder/:id',
      name: 'editCopywritingOrder',
      hidden: true,
      meta: {
        label: '查看订单'
      },
      component: _import('copywriting/order/editOrder')
    }
  ]
}
export default copywritingManage
