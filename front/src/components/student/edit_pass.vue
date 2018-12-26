<template>
  <div class="section">
  <div class="form">
    <el-form 
      :model="PassForm" 
      status-icon
      ref="PassForm" 
      :rules="rule"
      label-width="0"
      class="pass-form">
      <h3>修改密码</h3>
      <el-form-item prop="username">
        <el-input 
          type="text" 
          v-model="PassForm.username" 
          disabled=""
          placeholder="username" >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="PassForm.password" 
          placeholder="请输入新密码" >
        </el-input>
      </el-form-item>
        <el-form-item prop="checkPass">
        <el-input 
          type="password" 
          v-model="PassForm.checkPass" 
          placeholder="请确认新密码" >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          class="submitBtn"
          round
          @click="submit('PassForm')">
          确认
        </el-button>
        <el-button 
          type="danger"
          class="resetBtn" 
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p>点击我回到&nbsp;<span class="to" @click="tohome">首页</span></p>
      </el-form-item>
    </el-form>
  </div>
  </div>  
</template>

<script>

export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.PassForm.checkPass !== '') {
            this.$refs.PassForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.PassForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      PassForm: {
        username:sessionStorage.getItem('username'),
        password: '', 
        checkPass: '',    
      },
      rule: {
        password: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPass: [
          { 
            validator: validatePass2,
            trigger: 'blur' 
          }
        ]
      }
    }
  },

  methods: {
    reset () {
      this.$refs.PassForm.resetFields()
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:3000/user/updatepassword',this.PassForm).then((data) => {
                this.$message({
                  type:'success',
                  message:'修改成功,现返回登录页面'
                });
                this.$router.push('/');
              }).catch(function(error){
                this.$message({
                  type:'error',
                  message:'修改失败!'
                });
              });
             } else {
               console.log('error submit!!');
               }
           });
    },
    tohome() {
      this.$router.push('/library/slider');
  }
  }
 
}
</script>

<style scoped>
.section {
  position: absolute;
  width: 400px;
	margin: 80px auto;
}

.pass-form {
  margin: -120px 270px;
  width: 400px;
  height: 380px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 40px 30px 0 30px;
  border-radius: 25px; 
}
.submitBtn {
  margin-top: 8px;
  width: 47%;
}
.resetBtn {
  width: 47%;
}
.form {
  margin-top: 10%;
}
.code {
  height: 40px;
}
.to {
  color: #67C23A;
  cursor: pointer;
}
h3 {
  margin-top: 4px;
  text-align: center;
}
</style>

