import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/index.vue'
import Dashboard from '@/components/Sidebar.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard }
]

const router = new VueRouter({
  routes
})

// 路由导航
router.beforeEach((to, from, next) => {
  // const tokenStr = window.sessionStorage.getItem('token')
  // if (!tokenStr && to.path !== '/login') return next('/login')
  next()
})

export default router
