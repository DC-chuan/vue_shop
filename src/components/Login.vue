<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avater_box">
                <img src="../assets/logo.png" >
            </div>
            <!-- 登录表单区域 -->
            <el-form :model="loginForm" :rules="LoginFormRules"
                ref="loginFormRef"
                label-width="0px" class="login_form" >
                <!-- 用户名 -->
                <el-form-item  prop="username">
                    <el-input v-model="loginForm.username"
                    placeholder="请输入用户名"
                    prefix-icon="iconfont icon-user">
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"
                    placeholder="请输入密码"
                    prefix-icon="iconfont icon-password"
                    type="password">
                    </el-input>
                </el-form-item>
                <!-- 提交 和 重置 -->
                <el-form-item class="login_button">
                    <el-button type="primary" round @click="Login">登录</el-button>
                    <el-button type="info" round @click="loginReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {login} from '../api/http'
import md5 from 'md5'
export default {
    name:'Login',
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'12345678'
            },
            LoginFormRules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        loginReset(){
            this.$refs.loginFormRef.resetFields()
        },
        Login(){
            // 封装登录post数据
            const FormData = {
                username:this.loginForm.username,
                password:md5(md5(this.loginForm.password))
            };
            // 登录表单校验
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid) return;
                // 发起登录Ajax请求
                await login(FormData)
                .then(res=>{
                    const msg = res.data.msg
                    // 如果登陆失败
                   if(res.data.code !== 200) {
                       this.$message.error(msg);
                    } 
                    // 登录错误信息弹框提示
                    console.log(111);
                    this.$message.success(msg);

                    // 保存服务端响应的 token
                    window.localStorage.setItem('token',res.data.token);
                    // 跳转到home页面
                    this.$router.push('/home')
                })
                .catch(err=>console.log(err))
            })
        }
    },
}
</script>

<style lang="css" scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        transform: translateX(-50%) translateY(-50%);
        left: 50%;
        top: 50%;
        border-radius: 8px;
    }
    .avater_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .avater_box img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .login_button{
        display: flex;
        justify-content: flex-end;
    }
</style>
