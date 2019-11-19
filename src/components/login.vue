<template>
    <el-container :style="style" direction="vertical">
        <el-dialog title="注册" :visible.sync="registeredVisible">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="pass" style="font-weight: bolder">
                    <el-input v-model="registeredInfo.username" autocomplete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" style="font-weight: bolder">
                    <el-input v-model="registeredInfo.password" type="password" autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" style="font-weight: bolder">
                    <el-input v-model="registeredInfo.passwordAgain" type="password" autocomplete="off" placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="checkPass" style="font-weight: bolder">
                    <el-input v-model="registeredInfo.phone" autocomplete="off" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="checkPass" style="font-weight: bolder">
                    <el-row>
                        <el-col :span=6>
                            <el-input v-model="registeredInfo.code" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span=4>
                            <el-button type="text" v-on:click="getCode(0)"><span style="font-weight: bolder">获取验证码</span></el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="registered"><span style="font-weight: bolder">提交</span></el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="找回密码" :visible.sync="forgetVisible">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="pass" style="font-weight: bolder">
                    <el-input v-model="getPassword.username" autocomplete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" style="font-weight: bolder">
                    <el-input v-model="getPassword.password" type="password" autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="checkPass" style="font-weight: bolder">
                    <el-input v-model="getPassword.phone" autocomplete="off" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="checkPass" style="font-weight: bolder">
                    <el-row>
                        <el-col :span=6>
                            <el-input v-model="getPassword.code" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span=4>
                            <el-button type="text" v-on:click="getCode(1)"><span style="font-weight: bolder">获取验证码</span></el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="forgetPassword"><span style="font-weight: bolder">提交</span></el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-row style="width: 100%;margin-top: 15%;height: 30%">
            <el-col :span=8 :offset=8>
                <el-container direction="vertical">
                    <el-container>
                        <img :src="img" width="191rem" height="61rem" style="margin-left: 27%;margin-bottom: 3%">
                    </el-container>
                    <el-card body-style="padding-left:0;padding-right:12%">
                        <div slot="header" class="clearfix">
                            <span style="font-weight: bolder;color: #e70012">用户登录</span>
                        </div>
                        <el-form label-width="100px">
                            <el-form-item label="账户名" prop="age" style="font-weight: bolder">
                                <el-input v-model.number="logininfo.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="checkPass" style="font-weight: bolder">
                                <el-input type="password" v-model="logininfo.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" v-on:click="login" ><span style="font-weight: bolder">登录</span></el-button>
                                <el-button type="text" style="float: right" v-on:click="forgetVisible=true"><span style="font-weight: bolder">忘记密码</span></el-button>
                                <el-button type="text" style="float: right" v-on:click="registeredVisible=true"><span style="font-weight: bolder">注册账号</span></el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-container>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                forgetVisible:false,
                registeredVisible:false,
                img:require("../assets/img/gang.png"),
                registeredInfo:{
                    username:null,
                    password:null,
                    passwordAgain:null,
                    phone:null,
                    code:null,
                },
                getPassword:{
                    username:null,
                    password:null,
                    phone:null,
                    code:null,
                },
                logininfo:{
                    username:null,
                    password:null
                },
                style:{
                    backgroundImage: "url(" + require("../assets/img/x1.png") + ")",
                    "background-size": "cover",
                    "background-repeat": "no-repeat",
                    "background-position": "center",
                    "background-attachment":"fixed",
                    width:"100%",
                    "height":"100%",
                    "min-width": "1280px",
                    "min-height": "750px"
                }
            }
        },
        methods:{
            forgetPassword(){
                if (this.getPassword.password!==null && this.getPassword.code!==null && this.getPassword.phone!==null && this.getPassword.username!==null){
                    let params = {
                        username:this.getPassword.username,
                        phone: this.getPassword.phone,
                        password:this.getPassword.passwordAgain,
                        code: this.getPassword.code
                    };
                    this.$axios.post("/forgot", params).then(res=>{
                        this.$message({
                            type:"success",
                            message:"找回密码请求发送成功"
                        });
                        this.forgetVisible = false
                    }).catch(res=>{
                        this.$message("系统错误")
                    })
                }
            },
            getCode(index){
                let phone = null;
                if (index===0){
                    phone = this.registeredInfo.phone
                }else {
                    phone = this.getPassword.phone
                }
                if (phone !== null){
                    let url = "/getcode/" + phone;
                    this.$axios.get(url).then(res=>{
                        if (res.data.result==="发送成功"){
                            this.$message({
                                type:"success",
                                message:"验证码已经发送至您手机，注意查收"
                            })
                        }else {
                            this.$message.error("验证码发送失败")
                        }
                    }).catch(res=>{
                        this.$message("系统错误")
                    })
                }else {
                    this.$message.error("请输入手机号")
                }
            },
            registered(){
                if (this.registeredInfo.passwordAgain === this.registeredInfo.password){
                    if(this.registeredInfo.code!==null && this.registeredInfo.password!==null && this.registeredInfo.phone!==null && this.registeredInfo.username!==null){
                        let params = {
                            username:this.registeredInfo.username,
                            phone: this.registeredInfo.phone,
                            password:this.registeredInfo.passwordAgain,
                            code: this.registeredInfo.code
                        };
                        this.$axios.post('/regist', params).then(res=>{
                            if (res.data.return_code==="SUCCESS"){
                                this.$message({
                                    type:"success",
                                    message:"注册成功"
                                });
                                this.registeredVisible = false
                            }else {
                                this.$message.error(res.data.return_msg)
                            }
                        }).catch(res=>{
                            this.$message("系统错误")
                        })
                    }else {
                        this.$message.error("信息未填写完整")
                    }
                }else {
                    this.$message.error("两次密码输入不同")
                }
            },
            login(){
                this.$axios.post('/login',this.logininfo).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"登录成功"
                        });
                        this.$store.commit("login");
                        this.$router.push("index")
                    }
                    else {
                        this.$message.error("登录失败")
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
