/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'
const _import = file => () => import('@/views/' + file + '.vue')
const contentManageRouter = {
  path: '/contentManage/',
  component: Layout,
  name: 'contentManage',
  meta: { label: '内容管理', icon: 'icon-neirong' },
  children: [
    {
      path: 'classifiyList',
      name: 'classifiyList',
      meta: {
        label: '分类管理'
      },
      componentPath: 'content/classifiy/index'
      // component: _import('content/classifiy/index')
    },
    {
      path: 'editClassifiy/:mid/:pid',
      name: 'editClassifiy',
      meta: {
        label: '分类新增/编辑'
      },
      component: _import('content/classifiy/editClassifiy')
    },
    {
      path: 'posidClassifiyList',
      name: 'posidClassifiyList',
      meta: {
        label: '推荐位管理'
      },
      component: _import('content/posid/index')
    },
    {
      path: 'posidList/:posid_id',
      name: 'posidList',
      meta: {
        label: '推荐位列表'
      },
      component: _import('content/posid/list')
    },
    {
      path: 'editPosid/:posid_id',
      name: 'editPosid',
      meta: {
        label: '推荐位新增/编辑'
      },
      component: _import('content/posid/editPosid')
    },
    {
      path: 'materialList',
      name: 'materialList',
      meta: {
        label: '素材管理'
      },
      component: _import('content/material/index')
    },
    {
      path: 'rollingMessage',
      name: 'rollingMessage',
      meta: {
        label: '滚动信息'
      },
      component: _import('content/rollingMessage/index')
    },
    {
      path: 'course',
      name: 'course',
      meta: {
        label: '课程管理'
      },
      component: _import('content/course/index')
    }
  ]
}
export default contentManageRouter
