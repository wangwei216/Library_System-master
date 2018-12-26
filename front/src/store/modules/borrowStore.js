import axios from 'axios'
import Vue from 'Vue'
Vue.prototype.$http = axios

export default{
  state:{
      records:[]
  },
  getters:{
      records:state=>state.records
  },
  mutations:{
      alterRecords(state,data){
          state.records=data
      }
  },
  actions:{
        // 所有记录
        findAllRecords(context) {
            axios.get('http://localhost:3000/bookstudent/findAll').then(({data})=>{
                context.commit('alterRecords',data)
                }).catch((error)=>{
                console.log(error)
            })
        },
        // 学生借阅记录
        findStudentRecord(context,params) {
            axios.get('http://localhost:3000/bookstudent/studentRecord',{params}).then(({data})=>{
                console.log(params);
                context.commit('alterRecords',data)
            }).catch((error)=>{
                console.log(error)
            })
        },
        // 模糊查询(书名)
        findQueryBook1(context,params) {
            axios.get('http://localhost:3000/bookstudent/queryBook',{params}).then(({data})=>{
                context.commit('alterRecords',data)
            }).catch((error)=>{
                console.log(error)
            })
        },
        // 模糊查询(学生)
        findQueryStudent(context,params){
            axios.get('http://localhost:3000/bookstudent/queryStudent',{params}).then(({data})=>{
                context.commit('alterRecords',data)
            }).catch((error)=>{
                console.log(error)
            })
        },
        // 添加借阅信息
        saveborrowbook1(context,form,params){
            console.log(params);
            return new Promise(function(resolve,reject){
                axios.post('http://localhost:3000/bookstudent/addrecord',form).then((data)=>{
                resolve(data);
                }).catch(function(error){
                    reject(error)
                    console.log("error",error)
                })
            })
        },
        // 还书，管理员修改book_student表中信息
        updateborrowbook(context,form){
            return new Promise(function(resolve,reject){
                axios.post('http://localhost:3000/bookstudent/update',form).then((data)=>{
                    resolve(data);
                }).catch(function(error){
                    reject(error)
                    console.log("error",error)
                })
            })
        },
        // 学生归还图书
        returnBook(context,id){
            return new Promise((resolve,reject)=>{
                axios.post('http://localhost:3000/bookstudent/returnbook',{id:id}).then((data)=>{
                    context.dispatch('findStudentRecord');
                    resolve(data);
                }).catch((error)=>{
                    reject(error);
                });
            })
        },
                //查询借阅排行榜
                findTop(context) {
                  axios.get('http://localhost:3000/top/findTop')
                      .then(
                          response => {
                              context = response.data
                          }
                      ).catch((error) => {
                          console.log(error)
                      })
              },
        // 管理员删除记录
        deleteStudentRecord(context,id){
            return new Promise((resolve,reject)=> {
                axios.post('http://localhost:3000/bookstudent/deleterecord',{id:id}).then((data)=> {
                    context.dispatch('findAllRecords');
                    resolve(data);
                }).catch((error)=> {
                    reject(error);
                });
            });
        }
}
}
