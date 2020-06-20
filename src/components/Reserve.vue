<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">预约图书</h2>
      <el-form :model="input_form" :rules="rules" ref="inputformRef">
        <p>ISBN：</p>
        <el-form-item prop="ISBN">
          <el-input v-model="input_form.ISBN" placeholder="ISBN号"></el-input>
        </el-form-item>
        <p>预约时长：</p>
        <el-form-item prop="reserve_time">
          <el-input v-model.number="input_form.reserve_time" placeholder="预约时长"></el-input>
        </el-form-item>
        <el-button type="primary" @click="inputSubmit()" class="inputbtn">录入</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card-2">
      <h2 class="box-title">预约详情</h2>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="book_name" label="书名"></el-table-column>
        <el-table-column prop="ISBN" label="ISBN号"></el-table-column>
        <el-table-column prop="book_state" label="预约状态"></el-table-column>
        <el-table-column prop="time_limit" label="到期时间"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkTime = (rule, value, callback) => {
      if (value < 1) callback(new Error('预约时长需要大于1天！'))
      if (value > 10) callback(new Error('预约时长不能超过10天！'))
      if (!(value >= 1) && !(value <= 10)) {
        callback(new Error('输入含未知符号！'))
      }
      callback()
    }
    return {
      input_form: {
        reader_id: '',
        ISBN: '',
        reserve_time: ''
      },
      rules: {
        ISBN: [{ required: true, message: '不能为空', trigger: 'blur' }],
        reserve_time: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: checkTime, trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  created: function() {
    this.input_form.reader_id = window.sessionStorage.getItem('user_id')
    this.getData()
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.get('reserve_info', {
        params: {
          reader_id: this.input_form.reader_id
        }
      })
      this.tableData = []
      for (var idx in res.data) {
        var cur = res.data[idx]
        this.tableData.push({
          book_name: cur.book.bookName,
          ISBN: cur.reserveInfo.bookIsbn,
          book_state: cur.reserveInfo.reserveAgent === '成功' ? '已预约' : '暂无馆藏',
          time_limit: cur.reserveInfo.rentLimit
        })
      }
      console.log(this.tableData)
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        // 用axios提交表单交互
        console.log(this.input_form)
        var rdata = JSON.stringify(this.input_form)
        const { data: res } = await this.$http.post('reserve', rdata, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        console.log(res)
        if (res.code === 1) {
          this.getData()
          return this.$message.success('预约成功')
        }
        return this.$message.error(res.msg)
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.book_state === '已预约') {
        return 'success-row'
      }
      return ''
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
