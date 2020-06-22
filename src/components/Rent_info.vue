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
      function modifyDate(x) {
        x = x.split(',')
        x = x[0].trim() + ' ' + x[1].trim()
        x = x.split(' ')
        var mm = x[0]
        mm = mm.toUpperCase()
        var em = [
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAY',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OCT',
          'NOV',
          'DEC'
        ]
        switch (mm) {
          case em[0]:
            mm = 1
            break
          case em[1]:
            mm = 2
            break
          case em[2]:
            mm = 3
            break
          case em[3]:
            mm = 4
            break
          case em[4]:
            mm = 5
            break
          case em[5]:
            mm = 6
            break
          case em[6]:
            mm = 7
            break
          case em[7]:
            mm = 8
            break
          case em[8]:
            mm = 9
            break
          case em[9]:
            mm = 10
            break
          case em[10]:
            mm = 11
            break
          case em[11]:
            mm = 12
            break
        }
        x = x[2] + '年' + mm + '月' + x[1] + '日'
        return x
      }
      const data = res.data
      this.tableData = []
      for (var idx in data) {
        this.tableData.push({
          book_name: data[idx].book.bookName,
          ISBN: data[idx].rentInfo.bookIsbn,
          borrow_date: modifyDate(data[idx].rentInfo.borrowDate),
          time_limit: modifyDate(data[idx].rentInfo.returnDate)
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
