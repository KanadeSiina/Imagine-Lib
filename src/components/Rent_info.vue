<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借阅信息查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">借阅详情</h2>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="book_name" label="书名"></el-table-column>
        <el-table-column prop="ISBN" label="ISBN号"></el-table-column>
        <el-table-column prop="borrow_date" label="借阅时间"></el-table-column>
        <el-table-column prop="time_limit" label="到期时间"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reader_id: '',
      tableData: []
    }
  },
  created: function() {
    this.reader_id = window.sessionStorage.getItem('user_id')
    this.getData()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.book_state === '已预约') {
        return 'success-row'
      }
      return ''
    },
    async getData() {
      const { data: res } = await this.$http.get('rent_info', {
        params: {
          reader_id: this.reader_id
        }
      })
      const data = res.data
      this.tableData = []
      for (var idx in data) {
        this.tableData.push({
          book_name: data[idx].book.bookName,
          ISBN: data[idx].rentInfo.bookIsbn,
          borrow_date: data[idx].rentInfo.borrowDate,
          time_limit: data[idx].rentInfo.returnDate
        })
      }
      console.log(this.tableData)
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
