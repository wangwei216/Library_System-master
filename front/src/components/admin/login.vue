<template>
  <div class="section">
  <div class="ms-login">
    <el-form 
      :model="LoginForm" 
      status-icon
      ref="LoginForm" 
      :rules="rule"
      label-width="0"
      class="login-form">
      <h3>图书馆登录</h3>
      <el-form-item prop="username">
        <el-input 
          type="text" 
          v-model="LoginForm.username" 
          placeholder="学号" >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="LoginForm.password" 
          placeholder="密码" >
        </el-input>
      </el-form-item>
       <el-form-item  prop="validate">
        <el-input v-model="LoginForm.validate" class="validate-code" placeholder="验证码"></el-input>
        <div class="code" @click="refreshCode">
        <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
       </el-form-item>
      <el-form-item>
        <el-button 
          type="danger" 
          class="submitBtn"
          round
          @click="submit('LoginForm')">
          登录
        </el-button>
        <el-button 
          type="primary"
          class="resetBtn" 
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p>还没有账号，马上去&nbsp;<span class="to" @click="toregin">注册</span></p>
      </el-form-item>
    </el-form>
  </div>
  </div>
    
  
</template>

<script>


export default {
  // ....

  data () {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      LoginForm: {
        username: '',
        password: '',
        validate: ''       
      },
      rule: {
        username: [
          {
            required: true,
            message: '请输入学号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码！',
            trigger: 'blur'
          }
        ],
        validate: [
          { 
            required: true, 
            message: '请输入验证码',
            trigger: 'blur' 
          }
        ]
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    },
  methods: {
    reset () {
      this.$refs.LoginForm.resetFields();
    },
    toregin () {
      this.$router.push('/register');
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
        this.randomNum(0, this.identifyCodes.length)
        ];
        }
      console.log(this.identifyCode);
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:3000/login/selectUser',this.LoginForm).then((response) => {
             if (response.data == -1) {
               this.$message({
                 type:'error',
                 message:'用户不存在'
                 });
                console.log('该用户不存在');
            } else if (response.data == 0) {
              this.$message({
                type:'error',
                message:'密码错误'
                });
                console.log('密码错误');
            } else if (this.LoginForm.validate!=this.identifyCode) {
              console.log('验证码错误');
              this.$message({
                type:'error',
                message:'验证码错误'
                });
                } else if(response.data == 1) {
                  this.$router.push('/backhome/managebook');
                  // 将返回的数据注入sessionStorage
                  sessionStorage.setItem('username',this.LoginForm.username);
                  }else {
                    this.$router.push('/library/slider');
                  // 将返回的数据注入sessionStorage
                  sessionStorage.setItem('username',this.LoginForm.username);
                  }
            }).catch((error) => {
              console.log(error);
            });
            } else {
              console.log('error submit!!');
              return false;
              }
            });
      }
    }

  
}
</script>

<style scoped>
.section {
  position: absolute;
  width: 100%;
  height: 100%;
  background:url('../../../static/images/15.jpg');
  background-size:cover;
}

.login-form {
  margin: 0 auto;
  width: 380px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 20px 30px 0 30px;
  border-radius: 25px; 
}
.submitBtn {
  width: 65%;
}
.resetBtn {
  width: 30%;
}
.to {
  color: #67C23A;
  cursor: pointer;
}
.validate-code {
  width: 244px;
  margin-right: 20px;
  float: left;
}
.ms-login {
  margin-top: 10%;
}
.code {
  height: 40px;
}
h3 {
  text-align: center;
}
</style>

