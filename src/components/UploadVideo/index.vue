<template>
  <div>
    <el-upload
      class="upload-demo"
      :headers="header"
      :action="uploadUrl"
      :limit="limitNum"
      accept=".rmvb,.mkv,.avi,.mp4,.mpeg"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :data="qnData"
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <el-button
        size="small"
        type="primary"
        icon="el-icon-upload"
      >点击上传</el-button>
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      @close="dialogVideoUrl = ''"
    >
      <video
        :src="dialogVideoUrl"
        controls="controls"
        style="width:100%;height:500px"
      >
        您的浏览器不支持 video 标签。
      </video>
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import commonApi from '@/api/common'
export default {
  // props: ['type', 'limitNum','list','auto'],
  props: {
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    limitNum: {
      type: Number,
      default: 1
    },
    sizeLimit: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      dialogVisible: false,
      dialogVideoUrl: '',
      qnData: {
        token: '',
        key: '',
        name: ''
      },
      // uploadUrl: 'http://upload.qiniup.com'
      uploadUrl: window.g.baseUrl + '/tools/upload'
    }
  },
  created () {
    // commonApi.getQiniuData().then(res => {
    //   this.qnData.token = res.data.upload_token
    //   this.qnData.key = res.data.upload_path
    //   this.qnData.name = res.data.upload_path
    // })
  },
  computed: {
    header () {
      const headers = {
        'access-token': getToken()
      }
      return headers
    }
  },
  methods: {
    handleSuccess (res, file) {
      this.$emit('getVideoUrl', file)
    },
    handleRemove (file, fileList) {
      this.$emit('getVideoUrl', fileList)
    },
    handlePreview (file) {
      this.dialogVideoUrl = file.url
      this.dialogVisible = true
    },
    handleExceed (file) {
      this.$message({
        message: '只能上传' + this.limitNum + '个文件',
        type: 'warning',
        duration: 2000
      })
    },
    beforeUpload (file) {
      const isLtSize = file.size / 1024 / 1024 < this.sizeLimit
      if (!isLtSize) {
        this.$message({
          message: `上传视频大小不能超过${this.sizeLimit}MB!`,
          type: 'warning'
        });
      }
      return isLtSize

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
