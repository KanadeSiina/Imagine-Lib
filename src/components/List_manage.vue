<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>入库管理</el-breadcrumb-item>
      <el-breadcrumb-item>图书信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">录入图书信息</h2>
      <el-form :model="input_form" :rules="rules" ref="inputformRef">
        <p>ISBN：</p>
        <el-form-item prop="ISBN">
          <el-input v-model="input_form.ISBN" placeholder="ISBN号"></el-input>
        </el-form-item>
        <p>图书ID：</p>
        <el-form-item prop="list_id">
          <el-input v-model="input_form.list_id" placeholder="图书ID"></el-input>
        </el-form-item>
        <p>图书位置：</p>
        <el-form-item prop="list_place">
          <el-select v-model="input_form.list_place" placeholder="请选择">
            <el-option key="1" label="阅览室" value="read"></el-option>
            <el-option key="2" label="流通室" value="flow"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="inputSubmit()" class="inputbtn">录入</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card-2">
      <h2 class="box-title">删除图书信息</h2>
      <el-form :model="del_form" :rules="rules" ref="delformRef">
        <p>图书ID：</p>
        <el-form-item prop="id_del">
          <el-input v-model.number="del_form.id_del" placeholder="图书ID"></el-input>
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
        list_id: '',
        list_place: ''
      },
      del_form: {
        id_del: ''
      },
      rules: {
        ISBN: [{ required: true, message: '不能为空', trigger: 'change' }],
        list_id: [{ required: true, message: '不能为空', trigger: 'change' }],
        list_place: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        id_del: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    clearInput() {
      input_form = {
        ISBN: '',
        list_id: '',
        list_place: ''
      }
    },
    clearDel() {
      del_form = {
        id_del: ''
      }
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        if (!valid) return this.$message.error('格式错误')
        const anf = this.input_form
        const { data: res } = await this.$http.post(
          'add_list',
          JSON.stringify(anf),
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
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
          'del_list',
          JSON.stringify(this.del_form.id_del),
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }
        )
        console.log(res)
        if (res.code === 1) {
          clearDel()
          return this.$message.success('删除成功')
        }
        return this.$message.error(res.msg)
      })
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
