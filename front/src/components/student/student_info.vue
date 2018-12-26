<template>
	<div id="usercenter">
        <h3>修改信息</h3>
		<div class="userContent">
			<el-form ref="form" :model="form" label-width="60px" :rules="rule" status-icon>
				<el-form-item label="学号" prop="Student_code">
					<el-input v-model="form.Student_code" disabled=""></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="Student_name">
					<el-input v-model="form.Student_name"></el-input>
				</el-form-item>
				<el-form-item label="专业" prop="Academy_name">
					<el-input v-model="form.Academy_name"></el-input>
				</el-form-item>
				<el-form-item label="班级" prop="Class_name">
					<el-input v-model="form.Class_name"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="Sex"> 
					<el-select class="select-sex" v-model="form.Sex" placeholder="请选择性别">
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="邮箱" prop="Email">
					<el-input v-model="form.Email"></el-input>
				</el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click.native.prevent="reset">重置</el-button>
                </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'
	export default {
		data() {
            return {
				form: {
                    Student_code:sessionStorage.getItem('username'),
                    Student_name: '',
                    Academy_name: '',
                    Class_name: '',
                    Sex: '',
                    Email: ''       
                },
                /*rule: {
                    Student_name: [
                    {
                         required: true, 
                         message: '请输入昵称',
                         trigger: 'blur' 
                    }],
                    Academy_name: [
                    { 
                        required: true, 
                        message: '请输入专业',
                        trigger: 'blur' 
                    }],
                    Class_name: [
                    { 
                        required: true, 
                        message: '请输入班级',
                        trigger: 'blur' 
                    }],
                    Sex: [
                    { 
                        required: true, 
                        message: '请选择性别',
                        trigger: 'blur' 
                    }],
                    Email: [
                    { 
                        required: true, 
                        message: '请输入邮箱',
                        trigger: 'blur' 
                    }],
                    }*/
                    }
        },
        
        mounted() {
            this.getUserData();			
        },   
        methods: {
            reset() {         
                this.$refs.form.resetFields()
            },
            getUserData() {
                var params = {username:sessionStorage.getItem('username')};	
				this.$http.get('http://localhost:3000/student/findStudent',{params}).then((response)=> {
                    let result = response.data[0];
                    this.form.Student_name = result.Student_name;
					this.form.Academy_name = result.Academy_name
					this.form.Class_name = result.Class_name;
					this.form.Sex = result.Sex;
					this.form.Email = result.Email;
				}).then(function(error) {
					console.log(error);
				})
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('http://localhost:3000/student/updateinfo',this.form).then((data) => {
                            this.$message({
                            type:'success',
                            message:'修改成功'
                            });
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
    }
        }}	
</script>

<style>
.userContent {
	width: 400px;
	margin: 0 auto;
}
.select-sex {
	width: 340px;
}
#usercenter {
    margin-top: -40px;
}
h3 {
    text-align: center;
}
</style>