<template>
    <el-container class="home_container">
        <!-- 头部 -->
        <el-header>
            <div class="header_box">
                <img src="../assets/logo.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button @click="LogOut">退出登录</el-button>
        </el-header>
        <el-container> 
            <!-- aside -->
            <el-aside width="200px">
                <el-col>
                    <!-- 侧边栏菜单区 -->
                    <el-menu
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <!-- 一级菜单 -->
                        <el-submenu index="1">
                            <!-- 一级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>

                            <!-- 二级菜单 -->
                                <el-menu-item index="1-1">
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span>导航一</span>
                                    </template>
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span>导航一</span>
                                    </template>
                                </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-aside>
            <!-- main  -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name:'Home',
    methods:{
        LogOut(){
            window.localStorage.removeItem('token')
            this.$router.replace('/login')
        }
    }
}
</script>

<style  scoped>
    .home_container{
        height: 100%;
    }
    .el-header{
        background-image: linear-gradient(to right, #2b4b6b 0%, #1a3b30 30%,  #3f5770 79%, #2b4b6b 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 20px 0 0;
    }
    .header_box{
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        color: rgb(175, 196, 183);
        font-weight: 700;
    }
    .header_box img{
        height: 60px;
        border-radius: 50%;padding-left: 0;
        margin-right: 15px;
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #eaedf1;
    }
</style>