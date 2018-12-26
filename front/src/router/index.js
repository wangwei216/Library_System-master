import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Slider from '@/components/slider.vue'
import BookSearch from '@/components/student/search.vue'
import BookRecord from '@/components/student/records.vue'
import StudentCenter from '@/components/student/student_info.vue'
import editPassword from '@/components/student/edit_pass.vue'
import studentRecord from '@/components/admin/stu_record.vue'
import login from '@/components/admin/login.vue'
import register from '@/components/admin/register.vue'
import backHome from '@/components/admin/backHome.vue'
import manageBook from '@/components/admin/manage_book.vue'
//import bookRecord from '@/components/admin/book_record.vue'
import StudentInfo from '@/components/admin/stu_info.vue'
import top from '@/components/admin/top.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: login,
  },
  {
    path: '/register',
    component: register,
  },
    {
    path: '/library',
    component: Home,
    children: [
      {
      path: 'slider',
      component: Slider
    },
    {
      path:'booksearch',
      component:BookSearch
    },
    {
      path: 'bookrecord',
      component: BookRecord
    },
    {
      path: 'studentinfo',
      component: StudentCenter
    },
    {
      path: 'studentrecord',
      component: studentRecord
    },
    {
      path: 'editpassword',
      component: editPassword

    }
  ]
},
{
  path: '/backhome',
  component: backHome,
  children: [
  {
    path:'managebook',
    component:manageBook
  },
  {
    path: 'studentinfo',
    component: StudentInfo
  },
  {
    path: 'top',
    component: top
  },
  {
    path: 'studentrecord',
    component: studentRecord
  }]
}]
})
