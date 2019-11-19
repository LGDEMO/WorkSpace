<template>
    <el-container style="height: 100%">
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form status-iconlabel-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="pass">
                    <el-input type="password" v-model="password.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="password.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkPass">
                    <el-input type="password" v-model="password.newPasswordAgain" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="setPassword">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-card style="width: 100%;height:100%" body-style="padding-right:60%">
            <div slot="header" class="clearfix">
                <span style="font-weight: bolder">个人中心</span>
                <el-button style="margin-left: 3%; float: right; padding: 3px 0" type="text" v-on:click="disabled=false">修改信息</el-button>
                <el-button style="float: right; padding: 3px 0" type="text" v-on:click="dialogFormVisible=true">修改密码</el-button>
            </div>
            <el-form :model="userInfo" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="注册类型" prop="invoiceHeader">
                    <el-input value="个人注册" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="phone">
                    <el-input v-model="userInfo.fullname" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="bank">
                    <el-input v-model="userInfo.phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="bankAccount">
                    <el-input v-model="userInfo.email" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="工作单位" prop="address">
                    <el-input v-model="userInfo.company" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>
</template>

<script>
    export default {
        name: "UserInfoPage",
        data() {
            return {
                password:{
                    oldPassword:null,
                    newPassword:null,
                    newPasswordAgain:null
                },
                dialogFormVisible:false,
                disabled:true,
                userInfo:null,
            };
        },
        created(){
            this.getUserInfo()
        },
        methods: {
            setPassword(){
                this.dialogFormVisible = false
            },
            save(){
                let params = {
                    name:this.userInfo.fullname,
                    company:this.userInfo.company,
                    email:this.userInfo.email
                };
                this.$axios.post('/setdetail', params).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"设置成功"
                        });
                        this.disabled = true
                    }else {
                        this.$message.error("设置失败")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            getUserInfo(){
                this.$axios.get('/getdetail').then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.userInfo = res.data
                    }else {
                        this.$message.error("获取用户信息错误，请重新登入");
                        this.$store.commit("logout");
                        this.$router.push("login")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            }
        }
    }
</script>

<style scoped>

</style>
