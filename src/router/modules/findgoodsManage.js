/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'
const _import = file => () => import('@/views/' + file + '.vue')
const findgoodsManage = {
  path: '/findgoodsManage/',
  component: Layout,
  name: 'findgoodsManage',
  meta: { label: '找好货', icon: 'icon-haohuo' },
  children: [
    {
      path: 'brandList',
      name: 'brandList',
      meta: {
        label: '品牌管理'
      },
      component: _import('findgoods/brand/index')
    },
    {
      path: 'editBrand',
      name: 'editBrand',
      hidden: true,
      meta: {
        label: '品牌新增/编辑'
      },
      component: _import('findgoods/brand/editBrand')
    },
    {
      path: 'goodsList',
      name: 'goodsList',
      meta: {
        label: '商品管理'
      },
      component: _import('findgoods/goods/index')
    },
    {
      path: 'editGoods',
      name: 'editGoods',
      hidden: true,
      meta: {
        label: '商品新增/编辑'
      },
      component: _import('findgoods/goods/editGoods')
    },
    {
      path: 'findgoodsOrderList',
      name: 'findgoodsOrderList',
      meta: {
        label: '订单管理'
      },
      component: _import('findgoods/order/index')
    },
    {
      path: 'findgoodsOrderDetail',
      name: 'findgoodsOrderDetail',
      hidden: true,
      meta: {
        label: '订单详情'
      },
      component: _import('findgoods/order/findgoodsOrderDetail')
    },
    {
      path: 'specs',
      name: 'specs',
      hidden: true,
      meta: {
        label: '规格管理'
      },
      component: _import('findgoods/specs/index')
    }
  ]
}
export default findgoodsManage
