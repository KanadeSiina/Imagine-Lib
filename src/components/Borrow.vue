<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借书管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">借阅书目</h2>
      <el-form :model="input_form" :rules="rules" ref="inputformRef">
        <p>图书ID：</p>
        <el-form-item prop="list_id">
          <el-input v-model="input_form.list_id" placeholder="图书ID"></el-input>
        </el-form-item>
        <p>读者ID：</p>
        <el-form-item prop="reader_id">
          <el-input v-model="input_form.reader_id" placeholder="读者ID"></el-input>
        </el-form-item>
        <el-button type="primary" @click="inputSubmit()" class="inputbtn">录入</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input_form: {
        list_id: '',
        reader_id: ''
      },
      rules: {
        list_id: [{ required: true, message: '不能为空', trigger: 'change' }],
        reader_id: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    clearInput() {
      input_form = {
        list_id: '',
        reader_id: ''
      }
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        // 用axios提交表单交互
        // console.log(this.input_form)
        const { data: res } = await this.$http.post('borrow', this.input_form)
        console.log(res)
        if (res.code === 1) {
          this.clearInput()
          return this.$message.success('借阅成功')
        }
        return this.$message.error(res.msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-title {
  font-size: 20px;
  font-family: '微软雅黑';
  border-bottom: 3px solid rgba(207, 19, 19, 0.438);
}
.inputbtn {
  float: right;
  transform: translateY(-20%);
}
</style>
