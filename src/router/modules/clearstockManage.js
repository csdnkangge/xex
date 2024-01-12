/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'
const _import = file => () => import('@/views/' + file + '.vue')
const clearstockManage = {
  path: '/clearstockManage/',
  component: Layout,
  redirect: {
    name: 'clearstockList'
  },
  name: 'clearstockManage',
  meta: { label: '清库存', icon: 'icon-kucun' },
  children: [
    {
      path: 'clearstockGoodsList',
      name: 'clearstockGoodsList',
      meta: {
        label: '库存列表'
      },
      component: _import('clearstock/goods/index')
    },
    {
      path: 'editClearstockGoods',
      name: 'editClearstockGoods',
      hidden: true,
      meta: {
        label: '商品新增/编辑'
      },
      component: _import('clearstock/goods/editGoods')
    },
    {
      path: 'clearstockOrderList',
      name: 'clearstockOrderList',
      meta: {
        label: '订单管理'
      },
      component: _import('clearstock/order/index')
    },
    {
      path: 'editClearstockOrder/:id',
      name: 'editClearstockOrder',
      hidden: true,
      meta: {
        label: '查看订单'
      },
      component: _import('clearstock/order/editOrder')
    }
  ]
}
export default clearstockManage
