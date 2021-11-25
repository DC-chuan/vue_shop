import Vue from 'vue'
import {
    Message,
    Input,
    Form,
    FormItem,
    Button,
    Container,
    Header,
    Aside,
    Main,
    MenuItemGroup,
    Submenu,
    MenuItem,
    Col,
    Menu
} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Col)
Vue.use(Menu)
    // 开启全局message提示框
Vue.prototype.$message = Message;