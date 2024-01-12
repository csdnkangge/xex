<template>
  <div class="edit-activity clearfix">
    <el-col :span="12" :sm="18" :xl="12">
      <el-form
        label-width="200px"
        status-icon
        :model="formData"
        :rules="rules"
        ref="myForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input placeholder="请输入公告标题" v-model="formData.title" />
        </el-form-item>
        <el-form-item label="语言" prop="lang">
          <el-checkbox-group v-model="formData.lang">
            <el-checkbox
              v-for="item in lanList"
              :label="item.lang"
              :key="item.lang"
              >{{ item.showName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce
            :height="400"
            v-model="formData.content"
            ref="tinymce"
            v-if="showDesc"
          ></tinymce>
        </el-form-item>
        <el-col :span="2" :offset="7">
          <el-button
            :loading="loading"
            type="primary"
            @click="handleSubmit('myForm')"
            >确定</el-button
          >
        </el-col>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import Api from "@/api/content/notice";
import { timeFormat } from "@/utils/index";
import Tinymce from "@/components/Tinymce";
export default {
  data() {
    return {
      loading: false,
      lanList: [],

      id: this.$route.query.id,
      showDesc: false,
      formData: {
        lang: [],
        title: "",
        content: ""
      },
      rules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        lang: [{ required: true, message: "请选择语言", trigger: "change" }],
        content: [
          { required: true, message: "请填写公告内容", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  components: { Tinymce },
  created() {
    const id = this.$route.query.id;
    Api.getNoticeLangList().then(res => {
      this.lanList = res.data;
    });
    if (id) {
      Api.getNoticeDetail({ id }).then(res => {
        res.data.lang = res.data.lang.split(",");
        this.formData = res.data;
        this.showDesc = true;
      });
    }else{
      this.showDesc = true;
    }
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let { lang, title, content } = this.formData;
          const id = this.$route.query.id;
          let data = {
            lang: lang.join(","),
            title,
            content,
          };
          console.log(data);
          this.loading = true;
          if (id) {
            data.id=id
            Api.editNotice(data)
              .then(res => {
                this.$message({
                  message: "更新成功",
                  type: "success",
                  onClose: () => {
                    this.loading = false;
                    if (window.history.length > 1) {
                      this.$router.go(-1);
                      return false;
                    } else {
                      this.$router.push({ name: "noticeList" });
                    }
                  }
                });
              })
              .catch(() => {
                this.loading = false;
              });
          }else{
            Api.addNotice(data)
              .then(res => {
                this.$message({
                  message: "新增成功",
                  type: "success",
                  onClose: () => {
                    this.loading = false;
                    if (window.history.length > 1) {
                      this.$router.go(-1);
                      return false;
                    } else {
                      this.$router.push({ name: "noticeList" });
                    }
                  }
                });
              })
              .catch(() => {
                this.loading = false;
              });
          }
        } else {
          this.loading = false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-activity {
  margin-bottom: 50px;
  .hint {
    color: #ccc;
  }
}
.logo {
  height: 136px;
  border-radius: 3px;
  max-width: 800px;
  cursor: pointer;
}
</style>
