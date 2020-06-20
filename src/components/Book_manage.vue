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
          <el-input v-model="input_form.ISBN" placeholder="ISBN号">
            <el-button slot="append" icon="el-icon-search" @click="SearchISBN()"></el-button>
          </el-input>
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
          <el-input v-model.number="del_form.ISBN_del" placeholder="ISBN号"></el-input>
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
    clearInput() {
      this.input_form = {
        ISBN: '',
        book_name: '',
        book_author: '',
        book_publisher: '',
        book_pubdate: ''
      }
    },
    clearDel() {
      this.del_form = {
        ISBN_del: ''
      }
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        if (!valid) return this.$message.error('格式错误')
        const { data: res } = await this.$http.post(
          'add_book',
          JSON.stringify(this.input_form),
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
        console.log(res)
        if (res.code === 1) {
          this.clearInput()
          return this.$message.success('录入成功')
        }
        return this.$message.error(res.msg)
        // 用axios提交表单交互
        // console.log(this.input_form)
      })
    },
    delSubmit() {
      this.$refs.delformRef.validate(async valid => {
        if (!valid) return this.$message.error('格式错误')
        const { data: res } = await this.$http.post(
          'del_book',
          JSON.stringify(this.del_form.ISBN_del),
          {
            headers: {
              'Content-Type': 'text/html'
            }
          }
        )
        console.log(res)
        if (res.code === 1) {
          this.clearDel()
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async SearchISBN() {
      const isbn = this.input_form.ISBN
      const qform = { is_info: '0', isbn: isbn }
      const url = 'https://isbn.market.alicloudapi.com' + '/ISBN'
      const appcode = '1bf4177f12a445b1a6b28acac5a056cc'
      const { data: res } = await this.$http.get(url, {
        params: qform,
        headers: { Authorization: 'APPCODE ' + appcode }
      })
      if (res.error_code === 0) {
        this.input_form.book_name = res.result.title
        this.input_form.book_author = res.result.author
        this.input_form.book_publisher = res.result.publisher
        this.input_form.book_pubdate = res.result.pubdate
      } else {
        this.$message.error('未查询到该书信息')
      }
      console.log(res.result)
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
