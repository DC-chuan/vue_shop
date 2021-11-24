<template>
    <button @click="LogOut">退出登录</button>
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

<style>

</style>