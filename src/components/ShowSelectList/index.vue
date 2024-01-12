<template>
  <div>
    <ul>
      <li v-for="(item, index) in list">
        <div class="list-avatar" :style="{backgroundImage: 'url(' + (item.avatar) + ')'}">
          <el-button type="info" icon="el-icon-delete" circle @click="deleteList(index)"></el-button>
        </div>
        <div>{{item.nickname}}</div>
      </li>
      <li>
        <div class="list-avatar">
          <el-button type="primary" icon="el-icon-plus" circle plain @click="dialogVisible = true" class="add-btn" style="display: block"></el-button>
        </div>
        <div>添加</div>
      </li>
    </ul>
    <el-dialog
      title="选择网红"
      :visible.sync="dialogVisible"
      width="60%">
      <select-celebrity @getList="getList" :list="list"></select-celebrity>
    </el-dialog>
  </div>

</template>
<script>
  import selectCelebrity from '@/views/internet/celebrity/selectCelebrity'
  export default {
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    components: { selectCelebrity },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      getList(data) {
        let arr = []
        let arr2 = []
        data.forEach(item => {
          if (this.list.find(t => t.id === item.id) === undefined) {
            arr.push(item)
          } else {
            arr2.push(item.nickname)
          }
        })
        let postArr = [...this.list, ...arr]
        if (arr2.length !== 0) {
          let arrStr = '添加成功，' + arr2.join('，') + ' 网红已添加，请勿重复添加。'
          this.$message({
            message: arrStr,
            type: 'warning',
            duration: 2 * 1000
          })
        } else {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 2 * 1000
          })
        }
        this.postData(postArr)
      },
      deleteList(index) {
        let arr = JSON.parse(JSON.stringify(this.list))
        arr.splice(index, 1)
        this.postData(arr)
      },
      postData(arr) {
        this.$emit('getList', arr)
        this.dialogVisible = false
      }
    }
  }
</script>
<style  lang="scss" scoped>
  ul{
    padding-left: 0;
    margin-bottom: 0;
    li{
      text-decoration-line: none;
      display: inline-block;
      margin: 0 5px;
    }
    div{
      text-align: center;
    }
    .list-avatar{
      height: 40px;
      width: 40px;
      border-radius: 100%;
      background-size: 100% 100%;
      button{
        display: none;
        height: 40px;
        width: 40px;
      }
      &:hover{
        button{
          display: block;
        }
      }
    }
  }
</style>

