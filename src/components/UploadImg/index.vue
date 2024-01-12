<template>
  <el-upload class="avatar-uploader"
             accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
             :action="uploadUrl"
             :headers="header"
             :show-file-list="false"
             :on-success="handleSuccess"
             :before-upload="beforeUpload">
    <img v-if="imageUrl"
         :src="imageUrl"
         class="avatar">
    <i v-else
       class="el-icon-plus avatar-uploader-icon"></i>
    <slot name="tip"></slot>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    imageUrl: [String]
  },
  data () {
    return {
      uploadUrl: window.g.baseUrl + '/tools/upload'
    }
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
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('getImgUrl', file)
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
