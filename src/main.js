import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
// 引入字体图标样式
import './assets/fonts/iconfont.css'
//引入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')