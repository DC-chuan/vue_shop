### 基于vue和element-ui 构建的电商后台管理项目
    后端接口 http://localhost:3000/private/v1/ 

    使用组件库：el-form  el-form-item  el-input el-button 字体图标

    图标库：iconfont element-ui图标库
### 1、登录功能
    在页面 输入表单中 对密码使用 md5 进行加密 登陆成功之后 保存服务器返回的token（localstorage） 有效期为24小时（服务端设置）

 #### 2、路由导航守卫控制访问权限
    2.1如果用户没有登录 但是直接通过URL访问特定页面，需要重新定向到登录页面
    
    2.2、退出功能 使用点击事件 当用户点击退出 清楚浏览器上保存的token 并且重新定向到login页面

### 3、全局配置axios请求拦截器 添加token字段  保证拥有数据的权限
    axios.interceptors.request.use(config => {
        config.headers.Authorization = localStorage.getItem('token')
        return config;
    }, error => {
        // Do something with request error
        return Promise.reject(error);

    });
### 4、home组件获取数据
    4.1 利用created 钩子函数 在组件创建完成 时获取数据  此时开始绑定数据  但是还没有渲染模板

    4.2 通过 element-ui 配置 折叠 (collapse)   vue的过渡效果 transition  以及动态绑定 aside的宽度

    4.3 点击导航标签 使用 default-active: index  可以将组件的高亮状态保存到sessionstorage 中 即使刷新页面 也会保持高亮的哪一个组件
### 5、用户数据列表
    1、请求路径 /users 
    2、请求方法 get
    3、请求参数
    |参数名|参数说明 |备注|
    query | 查询参数| 可以为空
    pagenum| 当前页码| 不能为空
    pagesize| 每页显示条数| 不能为空|
    4、响应参数
    |参数名| 参数说明| 备注|
    totalpage| 总记录数 | 
    pagenum | 当前页码 | 
    users | 用户数据集合

    修改用户状态  监听switch组件的 状态 发起Ajax请求 更改服务端的数据
        url:'users/:uid/state/:type'
        请求方法：put 
    |参数名 | 参数说明 | 备注 |
    |uid |   用户ID |  不能为空 携带在URL中
    |type | 用户状态 | 不能为空 携带在URL中 值为 true 或者false

    # 添加用户 
    URL ：users 
    methods: 'post'
    | 参数名 | 参数说明 | 备注| 
    | username | 用户名 | 不能为空
    | password | 用户密码 | 不能为空 |
    | email |   邮箱  |  可以为空
    |mobile | 电话 |  可以为空
    响应结果：
    ID rid(角色ID)  username  mobile  email
    meta:   status 201

    #根据ID值获取用户数据
    URL: 'users/:uid'
    methods:'get'

    #编辑用户提交
    请求路径：'users/:uid'
    method:'put'
    响应体参数： ID role_id mobile email
    
    #删除单个用户
    url: 'users/:uid'
    methods : delete
    请求参数：ID 
    

    