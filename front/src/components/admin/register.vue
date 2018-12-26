<template>
  <div class="section">
  <div class="ms-login">
    <el-form 
      :model="RegisterForm" 
      label-width="52px"
      status-icon
      ref="RegisterForm" 
      :rules="rule"
      class="register-form">
      <h3>注册新用户</h3>
      <el-form-item prop="username" label="学号">
        <el-input 
          type="text" 
          v-model="RegisterForm.username" 
          placeholder="请输入学号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input 
          type="password" 
          v-model="RegisterForm.password" 
          placeholder="请输入密码" >
        </el-input>
      </el-form-item>
       <el-form-item prop="Student_name" label="昵称">
        <el-input 
          type="text" 
          v-model="RegisterForm.Student_name" 
          placeholder="请输入名字">
        </el-input>
      </el-form-item>
      <el-form-item prop="Academy_name" label="专业">
        <el-input 
          type="text" 
          v-model="RegisterForm.Academy_name" 
          placeholder="请输入专业" >
        </el-input>
      </el-form-item>
      <el-form-item prop="Class_name" label="班级">
        <el-input 
          type="text" 
          v-model="RegisterForm.Class_name" 
          placeholder="请输入班级">
        </el-input>
      </el-form-item>
      <el-form-item prop="Sex" label="性别">
        <el-radio-group v-model="RegisterForm.Sex" size="medium">
          <el-radio border label="男"></el-radio>
          <el-radio border label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="Email" label="邮箱">
        <el-input 
          type="text" 
          v-model="RegisterForm.Email" 
          placeholder="请输入邮箱" >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          class="submitBtn"
          round
          @click="submit('RegisterForm')">
          注册
        </el-button>
        <el-button 
          type="danger"
          class="resetBtn" 
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p>返回&nbsp;<span class="to" @click="tologin">登录</span>&nbsp;页面</p>
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
      RegisterForm: {
        username: '',
        password: '',
        Student_name: '',
        Academy_name: '',
        Class_name: '',
        Sex: '',
        Email: ''       
      },
      rule: {
        username: [
          {
            required: true,
            max: 10,
            min: 10,
            message: '请输入学号，长度为10位',
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
        Student_name: [
          { 
            required: true, 
            message: '请输入姓名',
            trigger: 'blur' 
          }
        ],
        Academy_name: [
          { 
            required: true, 
            message: '请输入专业',
            trigger: 'blur' 
          }
        ],
        Class_name: [
          { 
            required: true, 
            message: '请输入班级',
            trigger: 'blur' 
          }
        ],
        Sex: [
          { 
            required: true, 
            message: '请选择性别',
            trigger: 'blur' 
          }
        ],
        Email: [
          { 
            required: true, 
            message: '请输入邮箱',
            trigger: 'blur' 
          }
        ],
        
      }
    }
  },

  methods: {
    reset () {
      this.$refs.RegisterForm.resetFields();
    },
    tologin () {
      this.$router.push('/');
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:3000/register/adduser',this.RegisterForm).then((response) => {
             if (response.data == -1) {
               this.$message({
                 type:'error',
                 message:'学号不正确'
                 });
                console.log('学号不正确');
                } else {
                  this.$router.push('/');
                  this.$message({
                    type:'success',
                    message:'注册成功，返回登录页面'
                    });
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
  background:url('../../../static/images/13.jpg');
  background-size:cover;
}

.register-form {
  margin: 0 auto;
  width: 410px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 6px 50px 0 30px;
  border-radius: 25px; 
}
.submitBtn {
  margin-left: -20px;
  width: 50%;
}
.resetBtn {
  width: 50%;
}
.to {
  color: aqua;
  cursor: pointer;
}
.ms-login {
  margin-top: 30px;
}
h3 {
  text-align: center;
}
p {
  font-size: 15px;
  margin-top: -6px;
  margin-left: -20px;
}
hr {
  margin-left: -30px;
}
</style>

