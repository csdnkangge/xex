<template>
  <el-card>
    <el-row>
      <el-col :span="10">
        <el-form
          label-width="200px"
          :model="formData"
          :rules="rules"
          ref="myForm"
          status-icon
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              type="password"
              v-model="formData.oldPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              type="password"
              v-model="formData.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="verify_password">
            <el-input
              type="password"
              v-model="formData.verify_password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              @click="handleSubmit('myForm')"
              >提交</el-button
            >
            <el-button type="danger" @click="resetForm('myForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import Api from '@/api/user/user'
export default {
  data() {
    let validatePassOld = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.formData.verify_password !== '') {
          this.$refs.myForm.validateField('verify_password')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      formData: {
        oldPassword: '',
        password: '',
        verify_password: '',
        id: this.$route.query.id
      },
      rules: {
        oldPassword: [
          { required: true, validator: validatePassOld, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        verify_password: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
    }
  },
  created() {},
  methods: {
    handleSubmit(form) {
      this.loading = true
      this.$refs[form].validate(valid => {
        if (valid) {
          // if (this.formData.id) {
          Api.changePassword(this.formData)
            .then(res => {
              this.$message({
                message: res.msg ? res.msg : '修改成功',
                type: 'success',
                duration: 2 * 1000,
                onClose: () => {
                  this.loading = false
                }
              })
            })
            .catch(() => {
              this.loading = false
            })
          // }
        } else {
          this.loading = false
          return false
        }
      })
    },
    resetForm(form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
