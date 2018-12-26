import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$http = axios

export default{
	state:{
		students:[],
	},
	getters:{
		students:state=>state.students,
	},
	mutations:{
		alterStudents(state,data){
			state.students=data;
		},
	},
	actions:{
		//所有的
		findAllStudents(context){
			axios.get('http://localhost:3000/student/findAll').then(({data})=>{
				context.commit('alterStudents',data);
			})
        },
        // 保存学生信息
		saveStudent(context,form){
			return new Promise(function(resolve,reject){
				axios.post('http://localhost:3000/student/save',form).then((result)=>{
					context.dispatch('findAllStudents');
					resolve(result);
				}).catch(function(error){
					reject(error);
					console.log("error",error);
				});
			})
        },
        // 更新学生信息
		updateStudent(context,form){
			return new Promise(function(resolve,reject){
				axios.post('http://localhost:3000/student/update',form).then((result)=>{
					context.dispatch('findAllStudents');
					resolve(result);
					console.log("123",result);
				}).catch(function(error){
					reject(error);
				})
			})
        },
        // 删除学生信息
		batchDeleteStudent(context,ids){
			return new Promise((resolve,reject)=>{
				axios.post('http://localhost:3000/student/batchDelete',{ids:ids}).then((data)=>{
					context.dispatch('findAllStudents');
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
        },
            //查询借阅排行榜
            findTop(context) {
              axios.get('http://localhost:3000/top/findTop').then(({data})=>{
                  context.commit('findTop',data)
                  }).catch((error)=>{
                  console.log(error)
              })
          },
		findQueryStudent(context,params){
			axios.get('http://localhost:3000/student/query',{params}).then(({data})=>{
				context.commit('alterStudents',data);
			}).catch((error)=>{
				console.log(error);
			});
		},
	}
}
