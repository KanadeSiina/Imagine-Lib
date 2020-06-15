<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书目录</el-breadcrumb-item>
      <el-breadcrumb-item>图书简介</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">图书详情</h2>
      <!-- 搜索功能 -->
      <p style="font-size: 20px" align="center">{{book_name}}</p>
      <div class="sub-title">
        <p align="center">{{$route.params.id}}</p>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="list_id" label="图书ID">
          <template slot-scope="scope">
            <a :href="'/book/'+$route.params.id+'/'+scope.row.list_id">{{scope.row.list_id}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="list_place" label="图书位置"></el-table-column>
        <el-table-column prop="list_state" label="状态"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book_name: '初等数论',
      tableData: [
        {
          list_id: 'c11.1',
          list_place: '流通室',
          list_state: '未借出'
        }
      ]
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    async getData() {
      console.log(this.$route.params.id)
      const { data: res } = await this.$http.get('book_info', {
        params: { ISBN: this.$route.params.id }
      })
      console.log(res)
      this.tableData = res.data.tableData
      this.book_name = res.data.book_name
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
