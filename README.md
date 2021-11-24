### 基于vue和element-ui 构建的电商后台管理项目
    后端接口 http://139.196.94.15:8085/swagger-ui.html#/%E7%94%A8%E6%88%B7%E6%8E%A5%E5%8F%A3

    使用组件库：el-form  el-form-item  el-input el-button 字体图标

    图标库：iconfont element-ui图标库
### 1、登录功能
    在页面 输入表单中 对密码使用 md5 进行加密 登陆成功之后 保存服务器返回的token（localstorage） 有效期为24小时（服务端设置）

 #### 2、路由导航守卫控制访问权限
    如果用户没有登录 但是直接通过URL访问特定页面，需要重新定向到登录页面
    
    3、退出功能 使用点击事件 当用户点击退出 清楚浏览器上保存的token 并且重新定向到login页面

    