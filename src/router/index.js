import Vue from 'vue'
import VueRouter from 'vue-router'

//引入组件
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
]

const router = new VueRouter({
        routes
    })
    // 创建路由守卫
router.beforeEach((to, from, next) => {
    //  to 将要访问的路径
    // from 从哪个组件发生跳转
    // next 一个函数 放行
    // next()放行  next('/login')强制跳转到login
    if (to.path === '/login') return next()
        // 获取token
    const tokenStr = window.localStorage.getItem('token')
    if (!tokenStr) return next('/login')
        // 如果有token 放行
    next()
})

export default router