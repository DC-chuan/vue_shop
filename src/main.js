import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from './api/http'
// 引入字体图标样式
import './assets/fonts/iconfont.css'
//引入全局样式表
import './assets/css/global.css'
// 全局开启message提示

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    mounted() {
        Vue.prototype.$axios = axios;
        // console.log(this);
    }
}).$mount('#app')