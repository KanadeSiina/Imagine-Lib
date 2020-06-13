<template>
  <div class="login_container">
    <transition name="fade">
      <div v-show="show" class="login_box">
        <div class="container_header">
          <div class="login_title" style="font-size: 20px">幻想图书馆登陆</div>
        </div>
        <!-- 表单 -->
        <el-form
          :model="loginform"
          status-icon
          :rules="rules"
          ref="loginformRef"
          lable-width="0px"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginform.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginform.password"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <el-select v-model="loginform.charactor" placeholder="身份">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-form-item class="btns">
            <el-button type="primary" @click="login()">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else callback()
    }
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else callback()
    }
    return {
      show: false,
      loginform: {
        username: 'compute',
        password: '999',
        charactor: 'Reader'
      },
      rules: {
        username: [{ validator: checkName, trigger: 'blur' }],
        password: [{ validator: checkPass, trigger: 'blur' }]
      },
      options: [
        {
          value: 'Manager',
          label: '管理员'
        },
        {
          value: 'Reader',
          label: '读者'
        }
      ]
    }
  },
  mounted: function() {
    this.fadeIn()
  },
  methods: {
    fadeIn() {
      this.show = !this.show
    },
    login() {
      this.$refs.loginformRef.validate(async valid => {
        if (!valid) return this.$message.error('登陆失败！')
        const { data: res } = await this.$http.post('login', this.loginform)
        // 待有实际接口后修改
        if (res.meta.status !== 200) return this.$message.error('登陆失败！')
        this.$message.success('登陆成功！')
        // const res = { data: { token: '233' } }
        // console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/dashboard')
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login_container {
  //background-color: #c8ebdf;
  background-image: url('../assets/nephren.jpg');
  height: 100%;
}

.container_header {
  background-color: #ff6699;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  border-bottom: 2px solid rgba(207, 19, 19, 0.438);
}

.login_title {
  font-family: '微软雅黑';
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 100%);
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #000;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 85%;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  .el-select {
    width: 100px;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    float: right;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
