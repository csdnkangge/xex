/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'
const _import = file => () => import('@/views/' + file + '.vue')
const extensionManage = {
  path: '/extensionManage/',
  component: Layout,
  name: 'extensionManage',
  meta: { label: '推广联盟', icon: 'icon-tuiguang' },
  children: [
    {
      path: 'planList',
      name: 'planList',
      meta: {
        label: '推广计划'
      },
      component: _import('extension/plan/index')
    },
    {
      path: 'editPlan',
      name: 'editPlan',
      hidden: true,
      meta: {
        label: '计划新增/编辑'
      },
      component: _import('extension/plan/editPlan')
    }
  ]
}
export default extensionManage
