<template>
   <div>
       <!-- 导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区 -->
        <el-card>
            <!-- 搜索与输入区 -->
            <el-row :gutter="20">
                <el-col :span="10"  class="card-input">
                   <el-input clearable v-model="userInfo.query" placeholder="请输入内容" @clear="getUserList" >
                       <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
                </el-col>
            </el-row>  
        </el-card>
        <el-card>
            <el-table
            border
            stripe
            :data="userlist"
            width='100%'
            >   
                <el-table-column type='index'></el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    >
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="mobile" label="电话"
                    >
                </el-table-column>
                  <el-table-column prop="role_name" label="角色" >
                </el-table-column>
                  <el-table-column prop="mg_state" label="状态" >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="UserStateChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <!-- 操作区 -->
                 <el-table-column label="操作">
                     <template slot-scope="scope">
                        <el-button @click="openEditDialog(scope.row.id)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button @click="DeleteById(scope.row.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>
                        <el-button  type="success" icon="el-icon-setting" size="mini"></el-button>
                     </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="userInfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="userInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加用户 -->
        <el-dialog title="添加用户" 
        @close='addDialogClosed'
        :visible.sync="dialogFormVisible">
            <el-form 
            ref="AddFormRef"
            :model="AddForm" 
            :rules="AddFormRules"
            label-width="70px">
                <el-form-item label="用户名" prop="username">
                <el-input v-model="AddForm.username"  prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                <el-input v-model="AddForm.password" prefix-icon="iconfont icon-password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"  prop="email">
                <el-input v-model="AddForm.email" ></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                <el-input v-model="AddForm.mobile" ></el-input>
                </el-form-item>
            </el-form>                    
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewUser">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑用户对话框 -->
        <el-dialog
            @close='editDialogClosed'
            title="提示"
            :visible.sync="EditdialogVisible"
            width="50%">
            <el-form 
            ref="editFormRef"
            :model="userInfoById" 
            :rules="AddFormRules"
            label-width="70px">
                <el-form-item label="用户名" >
                <el-input v-model="userInfoById.username"  prefix-icon="iconfont icon-user" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱"  prop="email">
                <el-input v-model="userInfoById.email" ></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                <el-input v-model="userInfoById.mobile" ></el-input>
                </el-form-item>
            </el-form>                            
            <span slot="footer" class="dialog-footer">
                <el-button @click="EditdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRequest">确 定</el-button>
            </span>
        </el-dialog>
   </div>
</template>

<script>
import {GetUsers,ChangeState,addUser,getUserById,editUserById,DeleteById} from '../../api/user'

export default {
    name:'User',
    data(){
        // 验证邮箱的正则
        var CheckEmail = (rule,value,callback)=>{
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if(regEmail.test(value)){
                return callback()
            }
            callback(new Error('请输入合法的邮箱'))
        }
        // 验证手机号的正则
        var CheckMobile = (rule,value,callback)=>{
            const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if(regMobile.test(value)){
                return callback()
            }
            callback(new Error('请输入合法的手机号'))
        }
        return {
            userInfo:{
                query:'',
                pagenum: 1,
                pagesize: 2
            },
            total: 0,
            userlist: [],
            AddForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            // 编辑用户的数据
           userInfoById:{},
            // 控制添加用户对话框显示隐藏
            dialogFormVisible: false,
            // 编辑用户对话框
            EditdialogVisible: false,
            // 添加用户 表单验证规则
            AddFormRules:{
                username: [
                    { required: true , message: '请输入用户名', trigger: 'blur'},
                    { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符之间之间' ,trigger:'blur'}
                ],
                password: [
                    { required: true , message: '请输入密码', trigger: 'blur'},
                    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符之间之间' ,trigger:'blur'}
                ],
                email:[
                     { required: true , message: '请输入邮箱地址', trigger: 'blur'},
                     { validator : CheckEmail , trigger:'blur'}
                ],
                mobile:[
                     { required: true , message: '请输入手机号', trigger: 'blur'},
                     { validator : CheckMobile, trigger:'blur'}
                ]
            }
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        // 页面改变
        handleSizeChange(NewSize){
           this.userInfo.pagesize = NewSize
           this.getUserList()
        },
        handleCurrentChange(NewPage){
            this.userInfo.pagenum= NewPage
            this.getUserList()
        },
        // 监听添加用户对话框的关闭状态
        addDialogClosed(){
            this.$refs.AddFormRef.resetFields()
        },
        editDialogClosed(){
            this.$refs.editFormRef.resetFields()
        },
        // 返回一个promise对象 使用对象解构赋值 把响应结果赋值为res 使用async 等待Ajax请求完成之后再使用
        async getUserList(){
            const {data:res} = await GetUsers(this.userInfo)
            let status = res.meta.status
            // 请求失败
            if(status !== 200) return this.$message.error('获取用户数据失败')
            // 请求成功
            this.userlist = res.data.users
            this.total = res.data.total
        },
        // 监听用户状态的改变 传递的参数是用户的完整数据
        async UserStateChange(userinfo){
        const changeForm = {id:userinfo.id,state:userinfo.mg_state}
        const {data:res} = await ChangeState(changeForm)
        // 如果服务端返回状态码不是200 代表失败
        if(res.meta.status !== 200) {
            userinfo.mg_state = !userinfo.state
            return this.$message.error('用户状态修改失败')
        } 
        this.$message.success('修改成功')
        },
        // 添加新用户 预验证 以及发送请求
        addNewUser(){
            this.$refs.AddFormRef.validate(async valid=>{
               if(!valid) return //校验失败
            const {data:res} = await addUser(this.AddForm)
            if(res.meta.status !== 201) return this.$message.error(res.meta.msg)
            this.dialogFormVisible = false
            //刷新用户列表
            this.$message.success(res.meta.msg)
            this.getUserList()
            })
        },
        // 控制编辑用户对话框 在按钮处 使用了作用域插槽  
        // 使用scope.row 即可获取到当前父组件的数据 
        // 并把ID值作为参数
        async openEditDialog(id){
            const {data:res} = await getUserById(id)
            this.userInfoById = res.data
            this.EditdialogVisible = true
        },
        // 对编辑对话框信息进行预验证 以及发送Ajax请求
        editRequest(){
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid) return this.$message.error('信息校验不通过')
                const {data:res} = await editUserById(this.userInfoById)
                // 如果失败
                if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
                //修改成功 重新获取用户数据
                this.getUserList()
                // 提示信息 关闭对话框
                this.$message.success('修改成功')
                this.EditdialogVisible = false
            })
        },
        // 删除用户信息 点击确定返回 字符串confirm 取消 返回字符串cancel
        async DeleteById(id){
            const confirmResult = await this.$confirm('此操作会永久的删除用户并且无法恢复，是否继续','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
            })
            // 捕获取消行为
            .catch(err=>err)
           if(confirmResult !== 'confirm') return this.$message.warning('取消删除')
           const {data:res} = await DeleteById(id)
           if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            // 重新获取表单数据
           this.getUserList()
           this.$message.success('删除成功')
        }
    },

    // 组件内路由守卫
    beforeRouteLeave (to, from, next) {
        this.$bus.$emit('changeAct')
        next()
    }, 
    beforeDestroy(){
        window.sessionStorage.removeItem('DefAct')
        this.$bus.$off('changeAct')
    },
}
</script>

<style scoped>
    .el-pagination{
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }
    .card-input{
        margin: 0 auto;
    }
</style>