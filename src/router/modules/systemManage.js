/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'
const _import = file => () => import('@/views/' + file + '.vue')
const systemManageRouter = {
  path: '/systemManage/',
  component: Layout,
  redirect: {
    name: 'menulist'
  },
  name: 'systemManage',
  meta: { label: '系统配置', icon: 'icon-setting' },
  children: [
    {
      path: 'menuList',
      name: 'menuList',
      meta: {
        label: '路由管理'
      },
      component: _import('system/menu/index')
    },
    {
      path: 'editMenu',
      name: 'editMenu',
      hidden: true,
      meta: {
        label: '路由新增/编辑'
      },
      component: _import('system/menu/editMenu')
    },
    {
      path: 'roleList',
      name: 'roleList',
      meta: {
        label: '角色管理'
      },
      component: _import('system/role/index')
    },
    {
      path: 'editRole',
      name: 'editRole',
      hidden: true,
      meta: {
        label: '角色新增/编辑'
      },
      component: _import('system/role/editRole')
    },
    ,
    {
      path: 'roleRoute',
      name: 'roleRoute',
      hidden: true,
      meta: {
        label: '角色路由配置'
      },
      component: _import('system/role/roleRoute')
    },
    ,
    {
      path: 'rolePrivilege',
      name: 'rolePrivilege',
      hidden: true,
      meta: {
        label: '角色权限配置'
      },
      component: _import('system/role/rolePrivilege')
    },
    {
      path: 'privilegeList',
      name: 'privilegeList',
      meta: {
        label: '权限管理'
      },
      component: _import('system/privilege/index')
    },
    {
      path: 'editPrivilege',
      name: 'editPrivilege',
      hidden: true,
      meta: {
        label: '权限新增/编辑'
      },
      component: _import('system/privilege/editPrivilege')
    },
    {
      path: 'adminList',
      name: 'adminList',
      meta: {
        label: '管理员管理'
      },
      component: _import('system/admin/index')
    },
    {
      path: 'editAdmin',
      name: 'editAdmin',
      hidden: true,
      meta: {
        label: '管理员新增/编辑'
      },
      component: _import('system/admin/editAdmin')
    }
  ]
}
export default systemManageRouter
