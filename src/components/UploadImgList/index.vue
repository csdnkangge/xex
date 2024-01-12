<template>
  <div>
    <el-upload class="upload-demo"
               :limit="limitNum"
               ref="upload"
               :headers="header"
               :action="uploadUrl"
               list-type="picture-card"
               v-bind="$attrs"
               accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
               :on-remove="handleRemove"
               :on-success="handleSuccess"
               :on-error="handleError"
               :on-exceed="handleExceed"
               :file-list="fileList"
               :multiple="true">
      <div>
        <i class="el-icon-plus"></i>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { isString } from '@/utils/validate'
export default {
  props: {
    limitNum: {
      type: Number,
      default: 1
    },
    // 2.0版本图片列表，增加字段是为了兼容1.0版本多处用到list
    imgList: [Array]
  },
  data () {
    return {
      fileList: [],
      uploadUrl: window.g.baseUrl + '/tools/oss/upload'
    }
  },
  components: {},
  computed: {
    header () {
      const headers = {
        'access-token': getToken()
      }
      return headers
    }
  },
  watch: {
    // 2.0版本的传入图片列表，可传入数组和字符串，再封装好格式显示在upload组件
    imgList: {
      handler () {
        if (this.imgList.length > 0) {
          this.fileList = []
          this.imgList.forEach(item => {
            let num = item.lastIndexOf('/')
            let name = item.substr(num + 1)
            this.fileList.push({ name: name, url: item, response: { data: item } })
          })
        } else {
          this.fileList = []
        }
      },
      deep: true
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.$emit('getImgList', fileList)
    },
    handleSuccess (res, file, fileList) {
      this.$emit('getImgList', fileList)
    },
    handleError (err, file, fileList) {
      const error = JSON.parse(err.message)
      this.$message({
        message: error.message,
        type: 'error',
        duration: 2000
      })
    },
    handleExceed (file, fileList) {
      this.$message({
        message: '只能上传' + this.limitNum + '个文件',
        type: 'warning',
        duration: 2000
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
