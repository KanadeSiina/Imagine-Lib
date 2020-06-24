import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/index.vue')
const Dashboard = () => import('@/components/Sidebar.vue')
const BookManage = () => import('@/components/Book_manage.vue')
const ListManage = () => import('@/components/List_manage.vue')
const Borrow = () => import('@/components/Borrow.vue')
const Return = () => import('@/components/Return.vue')
const Reserve = () => import('@/components/Reserve.vue')
const RentInfo = () => import('@/components/Rent_info.vue')
const Book = () => import('@/components/Book.vue')
const BookInfo = () => import('@/components/BookInfo.vue')
const ListInfo = () => import('@/components/List_info.vue')

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
