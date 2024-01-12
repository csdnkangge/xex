import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  }
}

const routerMap = {
  router: [{
    path: '',
    componentPath: 'layout/Layout',
    // component: () => import('@/views/layout/Layout'),
    redirect: 'demo',
    meta: {
      title: 'MOCK', icon: 'icon-index'
    },
    label: 'MOCK',
    parentId: 1,
    children: [
      {
        path: 'demo',
        componentPath: 'systemManage/demo', // Parent router-view
        name: 'demo',
        label: 'demo',
        parentId: 2,
        meta: { title: 'demo' }
      }
    ]
  }]
}

const demoList = {
  list: [],
  total: 100
}

const regionList = {
  plist: [{
    localName: '福建',
    id: 1
  }],
  clist: [{
    localName: '厦门',
    id: 2
  }],
  rlist: [{
    localName: '思明',
    id: 3
  }]
}
export default {
  getRouterList: config => {
    return routerMap
  },
  getRegion: config => {
    // const parentId = param2Obj(config.url)
    // switch (parentId) {
    //   case 0:
    //     return regionList.plist
    //   case 1:
    //     return regionList.clist
    //   case 2:
    //     return regionList.rlist
    //   default:
    //     return []
    // }
    return regionList
  },
  getDemoList: config => {
    demoList.list = []
    const { page, pageSize } = JSON.parse(config.body)
    const begin = (page - 1) * pageSize
    const end = (page) * pageSize
    for (let i = begin; i < end; i++) {
      demoList.list.push({
        id: i + 1,
        region: '厦门',
        addr: '厦门',
        phone: '136666666'
      })
    }
    return demoList
  },
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
