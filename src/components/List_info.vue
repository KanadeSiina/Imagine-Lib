<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书目录</el-breadcrumb-item>
      <el-breadcrumb-item>图书简介</el-breadcrumb-item>
      <el-breadcrumb-item>{{list_id}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">借阅记录</h2>
      <!-- 搜索功能 -->
      <p style="font-size: 20px" align="center">{{book_name}}</p>
      <p align="center">{{list_id}}，{{list_place}}，{{list_state}}</p>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="reader_id" label="读者ID"></el-table-column>
        <el-table-column prop="borrow_date" label="借出时间"></el-table-column>
        <el-table-column prop="return_date" label="应还时间"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book_name: '',
      list_id: '',
      list_place: '',
      list_state: '',
      tableData: []
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    async getData() {
      // console.log(this.$route.params.id, this.$route.params.list_id)
      const { data: res } = await this.$http.get('list_info', {
        params: {
          ISBN: this.$route.params.id,
          list_id: this.$route.params.list_id
        }
      })
      // console.log(res)
      this.book_name = res.data.book.bookName
      this.list_id = res.data.bookLists[0].listId
      this.list_place = res.data.bookLists[0].listPlace
      this.list_state = res.data.bookLists[0].listState
      this.tableData = []
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
      for (var idx in res.data.RentInfoList) {
        var cur = res.data.RentInfoList[idx]
        this.tableData.push({
          reader_id: cur.readerId,
          borrow_date: modifyDate(cur.borrowDate),
          return_date: modifyDate(cur.returnDate)
        })
      }
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
</style>
