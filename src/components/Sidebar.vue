<template>
  <el-container class="dashboard">
    <!-- Header -->
    <el-header>
      <div class="head-container">
        <img src="../assets/SHU_logo.png" class="logo"/>
        <div class="header-container" style="font-size: 20px">幻想图书馆</div>
      </div>
    </el-header>
    <el-container>
      <!-- Aside -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse()">|||</div>
        <el-menu
          background-color="#323744"
          text-color="#fff"
          active-text-color="#409eff"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>入库管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="Book_Manage">书目信息管理</el-menu-item>
              <el-menu-item index="List_Manage">图书信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="borrow">
            <i class="el-icon-document"></i>
            <span slot="title">借书管理</span>
          </el-menu-item>
          <el-menu-item index="return">
            <i class="el-icon-document"></i>
            <span slot="title">还书管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- Container -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      isCollapse: false,
      activePath: ''
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
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

  .header-container {
    padding-left: 40px;
    padding-top: 18px;
    font-family: '微软雅黑';
    color: #fff;
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
  background-color: #373c41;
}

.el-aside {
  background-color: #323744;
  .el-menu {
    border-right: none;
  }
}
</style>
