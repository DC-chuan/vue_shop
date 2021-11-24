import { Message, Input, Form, FormItem, Button } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
    // 开启全局message提示框
Vue.prototype.$message = Message;