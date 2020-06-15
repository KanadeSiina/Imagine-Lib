<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>入库管理</el-breadcrumb-item>
      <el-breadcrumb-item>书目信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">录入书目信息</h2>
      <el-form :model="input_form" :rules="rules" ref="inputformRef">
        <p>ISBN：</p>
        <el-form-item prop="ISBN">
          <el-input v-model="input_form.ISBN" placeholder="ISBN号"></el-input>
        </el-form-item>
        <p>书目名称：</p>
        <el-form-item prop="book_name">
          <el-input v-model="input_form.book_name" placeholder="书目名称"></el-input>
        </el-form-item>
        <p>作者：</p>
        <el-form-item prop="book_author">
          <el-input v-model="input_form.book_author" placeholder="作者"></el-input>
        </el-form-item>
        <p>出版社：</p>
        <el-form-item prop="book_publisher">
          <el-input v-model="input_form.book_publisher" placeholder="出版社"></el-input>
        </el-form-item>
        <p>出版日期：</p>
        <el-form-item prop="book_pubdate">
          <el-date-picker v-model="input_form.book_pubdate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="inputSubmit()" class="inputbtn">录入</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card-2">
      <h2 class="box-title">删除书目信息</h2>
      <el-form :model="del_form" :rules="rules" ref="delformRef">
        <p>ISBN号：</p>
        <el-form-item prop="ISBN_del">
          <el-input v-model="del_form.ISBN_del" placeholder="ISBN号"></el-input>
        </el-form-item>
        <el-button type="primary" @click="delSubmit()" class="inputbtn">删除</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input_form: {
        ISBN: '',
        book_name: '',
        book_author: '',
        book_publisher: '',
        book_pubdate: ''
      },
      del_form: {
        ISBN_del: ''
      },
      rules: {
        ISBN: [{ required: true, message: '不能为空', trigger: 'change' }],
        book_name: [{ required: true, message: '不能为空', trigger: 'change' }],
        book_author: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        book_publisher: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        ISBN_del: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        if (!valid) return this.$message.erros('格式错误')
        const { data: res } = this.$http.post('add_book', this.input_form)
        console.log(res)
        // 用axios提交表单交互
        // console.log(this.input_form)
      })
    },
    delSubmit() {
      this.$refs.delformRef.validate(async valid => {
        if (!valid) return this.$message.erros('格式错误')
        const { data: res } = this.$http.post('del_book', this.del_form)
        console.log(res)
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
