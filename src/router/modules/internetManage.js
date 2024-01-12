/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'
const _import = file => () => import('@/views/' + file + '.vue')
const internetManageRouter = {
  path: '/internetManage/',
  component: Layout,
  name: 'internetManage',
  meta: { label: '网红点点通', icon: 'icon-ic' },
  children: [
    {
      path: 'internetCelebrityList',
      name: 'internetCelebrityList',
      meta: {
        label: '网红管理'
      },
      component: _import('internet/celebrity/index')
    },
    {
      path: 'editInternetCelebrity',
      name: 'editInternetCelebrity',
      hidden: true,
      meta: {
        label: '网红新增/编辑'
      },
      component: _import('internet/celebrity/editCelebrity')
    },
    {
      path: 'internetCelebrityVideo/:id',
      name: 'internetCelebrityVideo',
      hidden: true,
      meta: {
        label: '网红视频列表'
      },
      component: _import('internet/celebrity/video')
    },
    {
      path: 'editInternetCelebrityVideo/:id',
      name: 'editInternetCelebrityVideo',
      hidden: true,
      meta: {
        label: '网红视频新增/编辑'
      },
      component: _import('internet/celebrity/editVideo')
    },
    {
      path: 'internetCaseList',
      name: 'internetCaseList',
      meta: {
        label: '案例管理'
      },
      component: _import('internet/case/index')
    },
    {
      path: 'editInternetCase',
      name: 'editInternetCase',
      hidden: true,
      meta: {
        label: '案例新增/编辑'
      },
      component: _import('internet/case/editCase')
    },
    {
      path: 'internetPackagesList',
      name: 'internetPackagesList',
      meta: {
        label: '套餐管理'
      },
      component: _import('internet/packages/index')
    },
    {
      path: 'editInternetPackages',
      name: 'editInternetPackages',
      hidden: true,
      meta: {
        label: '套餐新增/编辑'
      },
      component: _import('internet/packages/editPackages')
    },
    {
      path: 'internetOrderList',
      name: 'internetOrderList',
      meta: {
        label: '订单管理'
      },
      component: _import('internet/order/index')
    },
    {
      path: '/editInternetOrder/:id',
      name: 'editInternetOrder',
      hidden: true,
      meta: {
        label: '查看订单'
      },
      component: _import('internet/order/editInternetOrder')
    }
  ]
}
export default internetManageRouter
