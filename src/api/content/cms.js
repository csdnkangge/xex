
import request from '@/utils/request'
export default {
  // 获取广告列表
  getCmsList(data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/cms_advert',
      data
    })
  },
  // 获取广告详情
  getCmsDetail(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/find_cms_advert',
      data
    })
  },
  // 语言列表
  getNoticeLangList(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/noticeInfo/langList',
      data
    })
  },
  
  // 修改公告
  editCms(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/cms_advert_edit_submit',
      data
    })
  },
  // 新增公告
  addCms(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/cms_advert_add_submit',
      data
    })
  },
  // 删除
  deleteCms(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/data/cms_advert_del',
      data
    })
  },
  
}
