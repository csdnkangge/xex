
import request from '@/utils/request'
export default {
  // 获取公告列表
  getNoticeList(data = {}) {
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/noticeInfo/notice_info',
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
  // 公告详情
  getNoticeDetail(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/noticeInfo/find_notice_info',
      data
    })
  },
  // 修改公告
  editNotice(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/noticeInfo/notice_info_edit_submit',
      data
    })
  },
  // 新增公告
  addNotice(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/noticeInfo/notice_info_add_submit',
      data
    })
  },
  // 删除
  deleteNotice(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/noticeInfo/notice_info_batch_del',
      data
    })
  },
  // 置顶
  setTop(data={}){
    return request({
      url: `/external/forwarding`,
      method: 'post',
      project: 'saas-house',
      code: '/api/noticeInfo/notice_info_stick',
      data
    })
  }
  
}
