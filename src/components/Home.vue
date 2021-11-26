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
            <el-aside :width="isCollapse ?  '64px' : '200px' " >
                    <!-- 侧边栏菜单区 -->
                    <div class="controlCol" @click="controlCol">
                        <i :class=" collapseFont"></i></div>
                    <transition name="el-fade-in-linear">
                        <el-menu
                        :default-active='DefAct'
                        :router='true'
                        :collapse='isCollapse'
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409fff"
                        unique-opened>
                        <!-- 一级菜单 -->
                            <el-submenu 
                            :index="m1.id+''" 
                            v-for="(m1,index) in MenusData" 
                            :key="m1.id">
                            <!-- 一级菜单模板区 -->
                                <template slot="title">
                                    <i :class="fontlist[index]"></i>
                                    <span>{{m1.authName}}</span>
                                </template>
                            <!-- 二级菜单 -->
                                <el-menu-item :index=" '/'+m2.path " 
                                v-for="m2 in m1.children" :key="m2.id"
                                @click="SessionAct('/'+m2.path)">
                                    <template slot="title">
                                        <i class="el-icon-s-grid"></i>
                                        <span>{{m2.authName}}</span>
                                    </template>
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </transition>
            </el-aside>
            <!-- main  -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name:'Home',
    created(){
        this.getMenus()
        this.DefAct = sessionStorage.getItem('DefAct')
    },
    data(){
        return{
            MenusData:[],
            fontlist:[
                'iconfont icon-users',
                'iconfont icon-lifangtilitiduomiantifangkuai2',
                'iconfont icon-shop',
                'iconfont icon-danju',
                'iconfont icon-baobiao'
            ],
            // 是否折叠
            isCollapse:false,
            // 保存index高亮状态
            DefAct: ''
        }
    },

    methods:{
        LogOut(){
            window.localStorage.removeItem('token')
            this.$router.replace('/login')
        },
  async getMenus(){
            // es6对象结构赋值
        const {data:res} = await this.$http.get('menus')
            // 把获取到的表单数据给 VC
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.MenusData = res.data
        },
        // 控制折叠
        controlCol(){
         this.isCollapse = !this.isCollapse
        },
        SessionAct(data){
            sessionStorage.setItem('DefAct',data)
        },
        // 控制子组件被销毁后子组件的active样式
        changeAct(){
            console.log('home组件接受到了');
            this.DefAct = ''
        },
    },
    computed:{
        collapseFont(){
            if(this.isCollapse) return 'el-icon-s-unfold'
            return 'el-icon-s-fold'
        },
    },
    mounted() {
        this.$bus.$on('changeAct',this.changeAct)
    },
    beforeDestroy() {
        sessionStorage.removeItem('DefAct')
    },
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
    .el-menu{
        border-right: 0;
    }
    .el-submenu{
        margin: 0 0 15px 0;
        box-shadow: 0 0 1px;
        letter-spacing: 2px;
    }
    .el-submenu i {
        margin-right: 10px;
    }
    .controlCol{
        width: 100%;
        background-color: #414758;
        text-align: center;
        cursor: pointer;
        font-size: 20px;
    }
</style>