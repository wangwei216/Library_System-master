// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Carousel3d from 'vue-carousel-3d'
import scroll from 'vue-seamless-scroll'
import store from './store'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import SIdentify from './components/admin/Identify.vue';
import axios from 'axios'
import Chart from 'vue-chartjs'


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(Carousel3d)
Vue.use(Vuex)
Vue.use(scroll)
Vue.component("SIdentify",SIdentify);

new Vue({
  el: '#app',
  store, 
  router,
  components: { App },
  template: '<App/>'
})
