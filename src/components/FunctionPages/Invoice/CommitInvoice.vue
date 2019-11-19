<template>
    <el-container direction="vertical" style="width: 100%; height: 100%; padding-left: 3%; padding-right: 3%">
        <el-dialog title="确认开票" :visible.sync="dialogTableVisible">
            <span>此发票金额为{{moneySum}}元，是否确认开具</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitInvoice">确 定</el-button>
            </div>
        </el-dialog>
        <el-card style="width: 100%; height: 26%" body-style="padding-top:1%;padding-bottom:1%">
            <div slot="header" class="clearfix">
                <span style="font-weight: bolder">普通增值发票</span>
            </div>
            <el-row style="width: 100%; height: 100%">
                <el-col :offset=1 :span=10>
                    <el-container direction="vertical">
                        <el-row>
                            <el-col :span=7>
                                <span style="font-weight: 700;color: #606266">发票抬头</span>
                                <br>
                                <span style="font-weight: 700;color: #606266">纳税人识别号</span>
                                <br>
                                <span style="font-weight: 700;color: #606266">开票方式</span>
                                <br>
                                <span style="font-weight: 700;color: #606266">发票类型</span>
                            </el-col>
                            <el-col :span=17>
                                <span style="color:#e70012;font-weight: 700;margin-left: 5%">{{invoiceInfo.title}}</span>
                                <br>
                                <span style="color:#e70012;font-weight: 700;margin-left: 5%">{{invoiceInfo.taxnumber}}</span>
                                <br>
                                <span style="color:#e70012;font-weight: 700;margin-left: 5%">{{invoiceInfo.invoice_type2}}</span>
                                <br>
                                <span style="color:#e70012;font-weight: 700;margin-left: 5%">{{invoiceInfo.invoice_type}}</span>
                            </el-col>
                        </el-row>
                    </el-container>
                </el-col>
                <el-col :offset=1 :span=12>
                    <el-container direction="vertical">
                        <el-row>
                            <el-col :span=7>
                                <span style="font-weight: 700;color: #606266">基本开户银行</span>
                                <br>
                                <span style="font-weight: 700;color: #606266">基本开户账号</span>
                                <br>
                                <span style="font-weight: 700;color: #606266">注册所在地</span>
                                <br>
                                <span style="font-weight: 700;color: #606266">注册固定电话</span>
                            </el-col>
                            <el-col :span=17>
                                <span style="color:#e70012;font-weight: 700;margin-left: 5%">{{invoiceInfo.bankname}}</span>
                                <br>
                                <span style="color:#e70012;font-weight: 700;margin-left: 5%">{{invoiceInfo.banknumber}}</span>
                                <br>
                                <span style="color:#e70012;font-weight: 700;margin-left: 5%">{{invoiceInfo.address}}</span>
                                <br>
                                <span style="color:#e70012;font-weight: 700;margin-left: 5%">{{invoiceInfo.phone}}</span>
                            </el-col>
                        </el-row>
                    </el-container>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="width: 100%; height: 25%;margin-top: 1%" body-style="padding-top:0;padding-bottom:0.5%">
            <div slot="header" class="clearfix">
                <span style="font-weight: bolder">收件信息</span>
            </div>
            <el-table
                    border
                    :data="invoiceAddress"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="name"
                        label="姓名"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phone"
                        label="联系方式"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        label="区域"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="detail"
                        label="详细地址"
                        min-width="300">
                </el-table-column>
            </el-table>
        </el-card>
        <el-card style="width: 100%; height: 47%;margin-top: 1%" body-style="padding-top:0;padding-bottom:2%">
            <div slot="header" class="clearfix">
                <span style="font-weight: bolder">关联发票</span>
                <el-button style="float: right; padding: 3px 0" type="text" v-on:click="openDialog">确认开票</el-button>
            </div>
            <el-table
                    max-height="250px"
                    border
                    :data="invoiceList"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="order_id"
                        label="订单号"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="package_name"
                        label="产品名称"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="time"
                        label="支付时间"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="price"
                        label="金额"
                        min-width="100">
                </el-table-column>
            </el-table>
        </el-card>
    </el-container>
</template>

<script>
    export default {
        name: "commitInvoice",
        data(){
            return{
                dialogTableVisible:false,
                invoiceList:null,
                invoiceInfo:{
                    invoiceHeader:" ",
                    taxpayerId:" ",
                    invoiceMethod:" ",
                    invoiceType:" ",
                    bank:" ",
                    bankAccount:" ",
                    registeredAddress:" ",
                    phone:" "
                },
                invoiceSum:"",
                moneySum:0,
                invoiceAddress:[]
            }
        },
        created() {
            this.invoiceList = this.$store.state.invoiceState.requestList;
            if (this.invoiceList.length === 0){
                this.$router.push("requestInvoice")
            }
            this.getDefaultHeader();
        },
        methods:{
            openDialog(){
                for (let i=0; i<this.invoiceList.length;i++){
                    this.moneySum += parseInt(this.invoiceList[i].price);
                    this.invoiceSum += this.invoiceList[i].order_id + ","
                }
                this.dialogTableVisible = true;
            },
            commitInvoice(){
                let url="/invoice/" + this.invoiceSum;
                this.$axios.get(url).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"开票成功"
                        });
                        this.dialogTableVisible = false;
                        this.$router.push('invoiceList')
                    }else {
                        this.$message.err("开票失败")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
                this.moneySum = 0;
                this.invoiceSum = "";
            },
            getDefaultAddress(){
                this.$axios.get('/getaddress').then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        let AddressList = res.data.addresses;
                        for (let i=0; i<AddressList.length; i++){
                            if (AddressList[i].default_code==="1"){
                                this.invoiceAddress.push(AddressList[i])
                            }
                        }
                    }else {
                        this.$message.error("默认地址获取失败");
                        this.$router.push("product")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            getDefaultHeader(){
                this.$axios.get('/gettitle').then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        for (let i=0;i<res.data.titles.length;i++){
                            if (res.data.titles[i].default_code==="1"){
                                this.invoiceInfo = res.data.titles[i]
                            }
                        };
                        this.getDefaultAddress();
                    }else {
                        this.$message.error("发票抬头获取失败")
                        this.$router.push("product")
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
