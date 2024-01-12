<template>
  <!-- <div>
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
               :file-list="fileList">
      <div>
        <i class="el-icon-plus"></i>
      </div>
    </el-upload>
  </div> -->
  <div class="drag_container">
    <div v-for="(item,index) in fileList"
         v-dragging="{ item: item, list: fileList, group: 'imageList'}"
         :key="index"
         class="img_item"
         @mouseenter="point_index=index"
         @mouseleave="point_index=''">
      <img v-if="item.url"
           :src="item.url"
           class="avatar">
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
      <slot name="tip"></slot>
      <div v-show="point_index===index"
           class="delete_mask"
           @click="deleteImage(index)">
        <i class='el-icon-delete' />
      </div>
    </div>
    <el-upload v-if="fileList.length<limitNum"
               class="avatar-uploader"
               accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
               :action="uploadUrl"
               :headers="header"
               :show-file-list="false"
               :on-success="handleSuccess"
               :before-upload="beforeUpload">
      <i class="el-icon-plus avatar-uploader-icon"></i>
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
  data() {
    return {
      point_index: '',
      fileList: [],
      uploadUrl: window.g.baseUrl + '/tools/upload'
    }
  },
  components: {},
  computed: {
    header() {
      const headers = {
        'access-token': getToken()
      }
      return headers
    }
  },
  watch: {
    // 2.0版本的传入图片列表，可传入数组和字符串，再封装好格式显示在upload组件
    imgList: {
      handler() {
        if (this.imgList.length > 0) {
          this.fileList = []
          this.imgList.forEach(item => {
            let num = item.lastIndexOf('/')
            let name = item.substr(num + 1)
            this.fileList.push({ name: name, url: item, response: { data: item }})
          })
        } else {
          this.fileList = []
        }
      },
      deep: true
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit('getImgList', fileList)
    },
    handleSuccess(res, file) {
      // this.$emit('getImgList', fileList)
      //  this.imgList.push(index, 1)
      // this.imgList.push(file.response.data.url)
      // this.fileList.push(file)
      let name = file.name
      this.fileList.push({ name: name, url: file.response.data.url, response: { data: file.response.data.url }})
      this.$emit('getImgList', this.fileList)
    },
    handleError(err, file, fileList) {
      const error = JSON.parse(err.message)
      this.$message({
        message: error.message,
        type: 'error',
        duration: 2000
      })
    },
    handleExceed(file, fileList) {
      this.$message({
        message: '只能上传' + this.limitNum + '个文件',
        type: 'warning',
        duration: 2000
      })
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    deleteImage(index) {
      console.log(index)
      this.imgList.splice(index, 1)
    }
  },
  mounted() {
    this.$dragging.$on('dragend', (val) => {
      // 此处是拖动完成后鼠标松开时触发的事件
      this.$emit('getImgList', this.fileList)
    })
  }
}
</script>
<style>
.drag_container {
  display: flex;
  flex-wrap: wrap;
}
.drag_container .avatar-uploader,
.drag_container .img_item {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda !important;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.avatar-uploader .avatar-uploader-icon {
  overflow: hidden;
  background-color: #fff;
  border: none !important;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drag_container .avatar-uploader .el-upload {
  border: none !important;
}
.drag_container .avatar {
  width: 148px;
  height: 148px;
}
.drag_container .delete_mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}
.drag_container .delete_mask i {
  color: #fff;
  font-size: 24px;
}
</style>
