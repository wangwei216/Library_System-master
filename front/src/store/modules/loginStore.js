import axios from 'axios'
import Vue from 'Vue'
Vue.prototype.$http = axios
// 处理书籍的数据
export default{
  state: {
      users: []
  },
  getters: {
      users: function (state) {
          return state.users
          }
  },
  mutations: { 
      alterUser (state,data) {
          state.users= data
           }
  },
  actions: {
      findAllUser(context) {
          axios.get('http://localhost:3000/login/finduser').then(({data})=>{
              context.commit('alterUser',data)
              console.log(data);
          }).catch((error)=>{
              console.log(error);
          })

      }
  }


}