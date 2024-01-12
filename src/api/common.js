import request from '@/utils/request'
export default {
  getQiniuData() {
    return request.get('/tools/qiniu/upload')
  }
}
