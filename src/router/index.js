import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/index.vue'
import Dashboard from '@/components/Sidebar.vue'
import BookManage from '@/components/Book_manage.vue'
import ListManage from '@/components/List_manage.vue'
import Borrow from '@/components/Borrow.vue'
import Return from '@/components/Return.vue'
import Reserve from '@/components/Reserve.vue'
import RentInfo from '@/components/Rent_info.vue'
import Book from '@/components/Book.vue'
import BookInfo from '@/components/BookInfo.vue'
import ListInfo from '@/components/List_info.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [{
      path: '/Book_Manage',
      component: BookManage
    }, {
      path: '/List_manage',
      component: ListManage
    }, {
      path: '/borrow',
      component: Borrow
    }, {
      path: '/return',
      component: Return
    }, {
      path: '/reserve',
      component: Reserve
    }, {
      path: '/rent_info',
      component: RentInfo
    }, {
      path: '/book',
      component: Book
    }, {
      path: '/book/:id',
      component: BookInfo
    }, {
      path: '/book/:id/:list_id',
      component: ListInfo
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/* function checkAuth(to, token) {
  // 向后端请求验证身份
  return true
} */

// 路由导航
router.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr && to.path !== '/login') return next('/login')
  else if (tokenStr && to.path === '/login') return next('/dashboard')
  /* console.log(tokenStr)
  if (checkAuth(to, tokenStr)) {
    if (to.path === '/login') return next('/dashboard')
  } */
  // 记录当前路径
  // window.sessionStorage.setItem('activePath', to.path)
  next()
})

export default router
