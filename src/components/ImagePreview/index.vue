<template>
  <el-dialog
    :visible="dialogVisible"
    ref="dialog"
    style="text-align: center"
    :before-close="handleClose">
    <div @mousewheel="handleMousemove" class="dialog-img">
      <img :src="imgSrc" alt="" class="preview-img" :style="imgStyle">
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      imgSrc: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        imgStyle: '',
        deg: 0,
        scaleNum: 1
      }
    },
    watch: {
      dialogVisible() {
        this.imgStyle = ''
        this.deg = 0
        this.scaleNum = 1
      }
    },
    components: {},
    methods: {
      handleMousemove(e) {
        if (e.deltaY > 0) {
          this.scaleNum = this.scaleNum * 0.9
          this.imgStyle = `transform:scale(${this.scaleNum}) rotateZ(${this.deg * 90}deg)`
        } else {
          this.scaleNum = this.scaleNum * 1.1
          this.imgStyle = `transform:scale(${this.scaleNum}) rotateZ(${this.deg * 90}deg)`
        }
      },
      handleClose(done) {
        this.$emit('close')
        done()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btn-bar {
    margin-bottom: 10px;
    position: relative;
    button {
      position: relative;
      z-index: 9999;
    }
  }
  .dialog-img {
    width: auto;
    /*max-height: 500px;*/
    height: auto;
    margin: 0 auto;
    position: relative;
    .preview-img {
      transition: 0.5s;
      /* width: 100%; */
      /* max-width:100%; */
      max-height: 100%;
      max-width: 100%;
      /* height: 100%; */
    }
  }

</style>
