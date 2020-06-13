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
        <el-input placeholder="请输入内容" v-model="queryInfo.query.ISBN"></el-input>
      </span>
      <span>
        书名：
        <el-input placeholder="请输入内容" v-model="queryInfo.query.book_name"></el-input>
      </span>
      <span>
        作者：
        <el-input placeholder="请输入内容" v-model="queryInfo.query.book_author"></el-input>
      </span>
      <span>
        出版社：
        <el-input placeholder="请输入内容" v-model="queryInfo.query.book_publisher"></el-input>
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
        :page-sizes="[1, 2, 5, 10]"
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
        query: {
          ISBN: '',
          book_name: '',
          book_author: '',
          book_publisher: ''
        },
        pagenum: 1,
        pagesize: 2
      },
      total: 2,
      tableData: [
        {
          ISBN: 'ISBN7-302-02368-20',
          book_name: '初等数论',
          book_author: '潘承洞,潘承彪',
          book_publisher: '北京大学出版社',
          book_pubdate: '2003-01',
          book_num: '1'
        },
        {
          ISBN: 'ISBN-114514',
          book_name: '你爸爸',
          book_author: '我',
          book_publisher: '天堂',
          book_pubdate: '1999-01',
          book_num: '0'
        }
      ]
    }
  },
  methods: {
    getTable() {
      console.log(this.queryInfo)
    },
    // 页大小改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 页码改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 200px;
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
