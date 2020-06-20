<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书目录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">借阅详情</h2>
      <!-- 搜索功能 -->
      <span>
        ISBN号：
        <el-input placeholder="请输入内容" v-model="queryInfo.ISBN"></el-input>
      </span>
      <span>
        书名：
        <el-input placeholder="请输入内容" v-model="queryInfo.book_name"></el-input>
      </span>
      <span>
        作者：
        <el-input placeholder="请输入内容" v-model="queryInfo.book_author"></el-input>
      </span>
      <span>
        出版社：
        <el-input placeholder="请输入内容" v-model="queryInfo.book_publisher"></el-input>
      </span>
      <el-button icon="el-icon-search" @click="getTable()"></el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="ISBN" label="ISBN号">
          <template slot-scope="scope">
            <a :href="'/book/'+scope.row.ISBN">{{scope.row.ISBN}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="book_name" label="书名"></el-table-column>
        <el-table-column prop="book_author" label="作者"></el-table-column>
        <el-table-column prop="book_publisher" label="出版社"></el-table-column>
        <el-table-column prop="book_pubdate" label="出版日期"></el-table-column>
        <el-table-column prop="book_num" label="数量"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        ISBN: '',
        book_name: '',
        book_author: '',
        book_publisher: '',
        pagenum: 1,
        pagesize: 20
      },
      total: 0,
      tableData: []
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    getTable() {
      console.log(this.queryInfo)
    },
    async getData() {
      // console.log(this.queryInfo)
      const { data: res } = await this.$http.get('book', {
        params: this.queryInfo
      })
      console.log(res.data)
      const table = res.data.list
      this.tableData = []
      for (var idx in table) {
        this.tableData.push({
          book_name: table[idx].bookName,
          book_author: table[idx].bookAuthor,
          book_publisher: table[idx].bookPublisher,
          ISBN: table[idx].bookIsbn,
          book_pubdate: table[idx].bookPubdate,
          book_num: table[idx].bookNum
        })
      }
      this.total = res.data.total
    },
    // 页大小改变
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getData()
      // console.log(`每页 ${val} 条`)
    },
    // 页码改变
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getData()
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 150px;
  margin: 10px;
}
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
