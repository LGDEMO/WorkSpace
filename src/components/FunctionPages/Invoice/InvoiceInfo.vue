<template>
    <el-container>
        <el-dialog title="确认保存" :visible.sync="dialogTableVisible">
            <span>是否确认保存该信息</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" v-on:click="save">确 定</el-button>
            </div>
        </el-dialog>
        <el-card style="width: 100%" body-style="padding-right:60%">
            <div slot="header" class="clearfix">
                <span style="font-weight: bolder">发票信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" v-on:click="disabled=false"><span style="font-weight: bolder">修改信息</span></el-button>
            </div>
            <el-form :model="invoiceInfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="发票抬头" style="font-weight: bolder" prop="invoiceHeader">
                    <el-input v-model="invoiceInfo.title" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="税务登记号" style="font-weight: bolder" prop="taxpayerId">
                    <el-input v-model="invoiceInfo.taxnumber" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="基本开户银行" style="font-weight: bolder" prop="bank">
                    <el-input v-model="invoiceInfo.bankname" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="基本开户账户" style="font-weight: bolder" prop="bankAccount">
                    <el-input v-model="invoiceInfo.banknumber" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="注册所在地" style="font-weight: bolder" prop="address">
                    <el-input v-model="invoiceInfo.address" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="注册固定电话" style="font-weight: bolder" prop="phone">
                    <el-input v-model="invoiceInfo.phone" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="dialogTableVisible=true"><span style="font-weight: bolder">保存</span></el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>
</template>

<script>
    export default {
        name: "InvoiceInfo",
        data() {
            return {
                dialogTableVisible:false,
                disabled:true,
                invoiceInfo: {
                    address: " ",
                    bankname: " ",
                    banknumber: " ",
                    default_code: " ",
                    invoice_type: " ",
                    invoice_type2: " ",
                    phone: " ",
                    taxnumber: " ",
                    title: " ",
                    title_id: " "
                },
                rules: {
                    invoiceHeader: [
                        { required: true, message: '请输入抬头', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度不符合规范', trigger: 'blur' }
                    ],
                    taxpayerId: [
                        { required: true, message: '请输入税务登记号', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度不符合规范', trigger: 'blur' }
                    ],
                }
            };
        },
        created(){
            this.getInvoiceInfo()
        },
        methods: {
            save(){
                let params = {
                    title: this.invoiceInfo.title,
                    taxnum:this.invoiceInfo.taxnumber,
                    bank:this.invoiceInfo.bankname,
                    acount:this.invoiceInfo.banknumber,
                    address:this.invoiceInfo.address,
                    phone:this.invoiceInfo.phone
                };
                this.$axios.post("/settitle", params).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"修改成功",
                        });
                        this.dialogTableVisible = false;
                        this.disabled = true;
                        let url = "/setdeftitle/" + res.data.titleid;
                        this.$axios.get(url).then(res=>{

                        }).catch(res=>{

                        })
                    }else {
                        this.$message.error("设置失败")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            getInvoiceInfo(){
                this.$axios.get("/gettitle").then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        for(let i=0; i<res.data.titles.length; i++){
                            if (res.data.titles[i].default_code==="1"){
                                this.invoiceInfo= res.data.titles[i]
                            }
                        }
                    }else if (res.data.return_msg==="查询发票抬头失败！"){
                        this.$message.error("无发票抬头信息")
                    } else {
                        this.$message.error("获取发票抬头信息错误，请重新登入");
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
