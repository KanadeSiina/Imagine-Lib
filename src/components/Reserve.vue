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
      tableData: [
        {
          book_name: '初等数论',
          ISBN: 'ISBN7-302-02368-20',
          book_state: '已预约',
          time_limit: '2020-06-14 22:00:00'
        },
        {
          book_name: '你爸爸',
          ISBN: 'ISBN-114514',
          book_state: '暂无馆藏',
          time_limit: '2020-06-14 22:00:00'
        }
      ]
    }
  },
  created: function() {
    this.input_form.reader_id = window.sessionStorage.getItem('user_id')
    this.getData()
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.get('reserve', {
        params: {
          reader_id: this.input_form.reader_id
        }
      })
      this.tableData = res.data.data
      console.log(this.tableData)
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        // 用axios提交表单交互
        console.log(this.input_form)
        const { data: res } = await this.$http.post('reserve', this.input_form)
        console.log(res)
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
