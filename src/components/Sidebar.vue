<template>
  <el-container class="dashboard">
    <!-- Header -->
    <el-header>
      <div class="head-container">
        <img src="../assets/SHU_logo.png" class="logo" />
        <div class="header-container" style="font-size: 20px">
          <span class="titlename">图书管理系统</span>
          <div v-if="role === 'manager'">
            <el-menu class="el-menu-demo" mode="horizontal" router>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>入库管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/Book_Manage">书目信息管理</el-menu-item>
                  <el-menu-item index="/List_Manage">图书信息管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/borrow">
                <i class="el-icon-document"></i>
                <span slot="title">借书管理</span>
              </el-menu-item>
              <el-menu-item index="/return">
                <i class="el-icon-document"></i>
                <span slot="title">还书管理</span>
              </el-menu-item>
              <el-menu-item index="/book">
                <i class="el-icon-document"></i>
                <span slot="title">图书目录</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div v-else>
            <el-menu class="el-menu-demo" mode="horizontal" router>
              <el-menu-item index="/reserve">
                <i class="el-icon-document"></i>
                <span slot="title">预约管理</span>
              </el-menu-item>
              <el-menu-item index="/rent_info">
                <i class="el-icon-document"></i>
                <span slot="title">借阅信息</span>
              </el-menu-item>
              <el-menu-item index="/book">
                <i class="el-icon-document"></i>
                <span slot="title">图书目录</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <!-- Aside -->
      <!-- Container -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      role: '',
      isCollapse: false
    }
  },
  created: function() {
    this.setRole()
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setRole() {
      this.role = window.sessionStorage.getItem('role')
    }
  }
}
</script>

<style lang='less' scoped>
.head-container {
  .logo {
    transform: translate(-49%, -47%) scale(0.05, 0.05);
    position: absolute;
    top: 0;
  }

  .titlename {
    position: absolute;
    top: 15px;
    left: 70px;
  }

  .header-container {
    font-family: '微软雅黑';
    color: #000;
  }

  .el-menu-demo {
    position: absolute;
    top: 0;
    left: 200px;
  }
}

.dashboard {
  height: 100%;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-container {
  background-color: #eaedf2;
}

.el-header {
  background-color: #fff;
}

.el-aside {
  background-color: #323744;
  .el-menu {
    border-right: none;
  }
}
</style>
