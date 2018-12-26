<template>
  <div id="HelloWorld">
    <header>
      <el-row>
          <el-col :span="2" class="title"><i class="el-icon-setting"></i><span>&nbsp;&nbsp;</span>导航栏</el-col>
          <el-col :span="20" class="title"><b>图书管理系统</b></el-col>
          <el-col :span="2" class="title">
            <div class="user-info">
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <img class="user-logo" src="../../assets/logo.png">
                  {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="loginout">注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
      </el-row>
    </header>
    <article>
      <el-col :span="4">
        <el-menu router=true default-active="2" class="el-menu-vertical-demo" text-color="#303133" :collapse="isCollapse">
          <el-menu-item index="/backhome/managebook">
              <i class="el-icon-menu"></i>
              <span slot="title">图书管理</span>
              </el-menu-item>
          <!--
              <el-menu-item-group>
                <el-menu-item index="/backhome/bookrecord">
                <i class="el-icon-edit-outline"></i>
                <span>书籍借阅记录</span></el-menu-item>
              </el-menu-item-group>
          </el-submenu>-->
          <el-submenu index="/student">
            <template slot="title">
              <i class="el-icon-service"></i>
              <span>学生管理</span>
            </template>
              <el-menu-item-group>
                <el-menu-item index="/backhome/studentinfo">
                <i class="el-icon-info"></i>
                <span>学生信息</span></el-menu-item>
                <el-menu-item index="/backhome/studentrecord">
                <i class="el-icon-star-on"></i>
                <span>学生借阅历史</span></el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <!-- 这里新加一个top排行管理 -->
         <el-menu-item index="/backhome/top">
              <i class="el-icon-caret-top"></i>
              <span slot="title">借阅排行</span>
          </el-menu-item>

        </el-menu>
        </el-col>
        <el-col :span="20" class="container">
        <!-- 当路由发生改变，路由对应的模块显示到这里 -->
        <router-view></router-view>
        </el-col>
    </article>
 </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      };},
  computed: {
    username() {
      let username = sessionStorage.getItem('username');
      console.log(username);
      return username ? username : this.username;
    }
    },
    methods: {
      handleCommand(command) {
        if(command == 'loginout'){
          sessionStorage.removeItem('username');
          this.$router.push('/');
          }
        }
    }
  }
</script>

<style>

body {
  margin: 0;
  padding: 0;
}
header {
  background-color:#303133;
}
header .title {
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}

.container {
  padding: 6px;
  margin-top: 40px;
}

.user .button {
  margin: 12px 0;
  width:50%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  margin-top: 40px;
  width: 200px;
  min-height: 480px;

}
footer {
  height: 40px;
  width: 100%;
  position: fixed;
  bottom: 0;
  margin: 0;
  text-align: center;
  background-color: #303133;
  color: #fff;
}
a {color:aqua;}
.user-info {
  float:right;
  padding-right: 20px;
  font-size: 16px;
  color: #fff;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: wheat;
  cursor: pointer;
  vertical-align: middle;
  font-size: 14px;
}
.user-info .user-logo {
  position: absolute;
  left:6px;
  top:4px;
  width:40px;
  height:38px;
  border-radius: 10%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.copy {
  margin-top: 9px;
}
.logo {
  margin-left: -44px;
  margin-top: 2px;
  width: 56px;
  height: 38px;
}
p {
  font-size: 15px;
}
</style>
