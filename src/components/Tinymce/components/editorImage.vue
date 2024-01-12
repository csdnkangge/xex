<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload'
               size="mini"
               :style="{background:color,borderColor:color}"
               @click=" dialogVisible=true"
               type="primary">上传图片
    </el-button>
    <el-dialog append-to-body
               :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload"
                 :data="postType"
                 :action="uploadUrl"
                 :multiple="true"
                 :file-list="fileList"
                 :headers="header"
                 :show-file-list="true"
                 :on-change="onChange"
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
                 list-type="picture-card"
                 :on-remove="handleRemove"
                 :on-success="handleSuccess"
                 :before-upload="beforeUpload">
        <el-button size="small"
                   type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
// import { getToken } from 'api/qiniu'
import { getToken } from '@/utils/auth'
export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      postType: { type: 2 },
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadUrl: window.g.baseUrl + '/tools/upload'
    }
  },
  computed: {
    header () {
      let headers = {
        'access-token': getToken()
      }
      return headers
    }
  },
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess (response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    onChange (file, fileList) {
    },
    handleRemove (file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload (file) {
      if (file.size / 1024 / 1024 > 3) {
        this.$message.error({
          message: '图片不能大于3M'
        })
        return false
      } else {
        const _self = this
        const _URL = window.URL || window.webkitURL
        const fileName = file.uid
        this.listObj[fileName] = {}
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = function () {
            _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
          }
          resolve(true)
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
