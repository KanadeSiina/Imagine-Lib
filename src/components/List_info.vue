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
        <el-table-column prop="return_date" label="归还时间"></el-table-column>
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
      this.tableData = res.data.book
      this.book_name = res.data.book.bookName
      this.list_id = res.data.bookLists[0].listId
      this.list_place = res.data.bookLists[0].listPlace
      this.list_state = res.data.bookLists[0].listState
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
