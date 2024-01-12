<template>
  <div class="tinymce-container editor-container"
       :class="{fullscreen:fullscreen}">
    <textarea class="tinymce-textarea"
              :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <editorVideo v-if="showVideoButtom"
                   color="#1890ff"
                   class="editor-upload-btn"
                   @successCBK="videoSuccessCBK"></editorVideo>
      <editorImage v-if="showImageButton" color="#1890ff"
                   class="editor-upload-btn"
                   @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>
<script>
import editorImage from './components/editorImage'
import editorVideo from './components/editorVideo'
import plugins from './plugins'
import toolbar from './toolbar'
export default {
  name: 'tinymce',
  components: { editorImage, editorVideo },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    showVideoButtom: {
      type: Boolean,
      required: false,
      default: false
    },
    showImageButton:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => {
          window.tinymce.get(this.tinymceId).setContent(val || '')
        })
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        // object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        language: 'zh_CN',
        fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px  ',
        plugin_preview_height: 1000,
        plugin_preview_width: 1000,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        video_template_callback: function(data) {
          return '<video width="' + data.width + '" height="' + data.height +
            '"' + (data.poster ? ' poster="' + data.poster + '"' : '') +
            ' controls="controls">\n' + '<source src="' + data.source + '"' +
            (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' +
            (data.source2 ? '<source src="' + data.source2 + '"' +
              (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') +
            '</video>'
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="zmq" src="${v.url.url}" >`)
      })
    },
    videoSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(
          `<p>
              <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-controls="controls" data-mce-html="<source src='${v.url}' />" data-mce-selected="2">
                <video src="${v.url}" controls="controls" width="100%" frameborder="0"></video>
                <span class="mce-shim"></span>
              </span>
            </p>`
        )
      })
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>
<style scoped>
.tinymce-container {
  position: relative;
}

.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
