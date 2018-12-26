<template>
  <div id="HelloWorld">
    <header>
      <el-row>
          <el-col :span="2" class="title"><i class="el-icon-location-outline"></i><span>&nbsp;&nbsp;</span>导航栏</el-col>
          <el-col :span="20" class="title"><b>大连东软图书馆</b></el-col>
          <el-col :span="2" class="title">
            <div class="user-info">
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <img class="user-logo" src="../assets/user1.jpg">
                  {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                  <el-dropdown-item command="loginout">注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
      </el-row>
    </header>
    <article>
      <el-row class="aa">
        <el-radio-group v-model="isCollapse" style="margin:10px">
          <el-radio-button :label="true" background-color="#384F9C">收起</el-radio-button>
          <el-radio-button :label="false">展开</el-radio-button>
        </el-radio-group>
      </el-row>
          <el-col :span="4">
            <el-menu router=true default-active="2" class="el-menu-vertical-demo" text-color="#5F5F60" :collapse="isCollapse">
              <el-menu-item index="/library/slider">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="/library/booksearch">
              <i class="el-icon-search"></i>
              <span slot="title">图书检索</span>
              </el-menu-item>
              <el-submenu index="">
                <template slot="title">
                  <i class="el-icon-tickets"></i>
                  <span>我的图书馆</span>
                </template>
                  <el-menu-item-group>
                    <el-menu-item index="/library/bookrecord">
                    <i class="el-icon-edit-outline"></i>
                    <span>我的借阅</span></el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
              <el-submenu index="/admin">
                <template slot="title">
                  <i class="el-icon-star-on"></i>
                  <span>我的空间</span>
                </template>
                  <el-menu-item-group>
                    <el-menu-item index="/library/studentinfo">
                    <i class="el-icon-info"></i>
                    <span>个人中心</span></el-menu-item>
                    <el-menu-item index="/library/editpassword">
                    <i class="el-icon-edit"></i>
                    <span>修改密码</span></el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
            </el-menu>
            </el-col>
            <el-col :span="20" class="container">
            <!-- 当路由发生改变，路由对应的模块显示到这里 -->
            <router-view></router-view>
            </el-col>
    </article>
   <footer>
    <p class="copy">Copyright © 2018.&nbsp;&nbsp;South China Institute Of Software.&nbsp; All Rights Reserved</p>
</footer>
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
          } else if (command == 'userCenter') {
            this.$router.push('/library/studentinfo');
            }
          }
    }
  }
</script>

<style scoped>

body {
  margin: 0;
  padding: 0;
}
header {
  background-color:#384F9C;
}
header .title {
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}

.container {
  padding-top: 6px;
}

.user .button {
  margin: 12px 0;
  width:50%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 480px;
  margin-top: 16px;

}
.el-menu--collapse {
  width: 80px;
  margin-top: 16px;
  min-height: 480px;
  text-align: center;
}
footer {
  height: 38px;
  width: 100%;
  text-align: center;
  background-color: #384F9C;
  position: fixed;
  bottom: 0;
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
  height:40px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.copy {
  margin-top: 10px;
}
.logo {
  margin-left: -44px;
  margin-top: 2px;
  width: 56px;
  height: 36px;
}
p {
  font-size: 14px;
  text-align: center;
}
</style>
