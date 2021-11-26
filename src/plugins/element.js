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
    Menu,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Table,
    TableColumn,
    Switch,
    Pagination,
    Dialog,
    MessageBox,
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
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Card)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
    // 开启全局message提示框
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm