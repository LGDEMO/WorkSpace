<template xmlns:el-col="http://www.w3.org/1999/html">
    <el-container direction="vertical" style="width: 100%; height: 100%; padding-left: 3%; padding-right: 3%">
        <el-card style="width: 100%; height: 31%" body-style="padding-top:2%;padding-bottom:2%">
            <div slot="header" class="clearfix">
                <span style="font-weight: bolder">我的流量</span>
            </div>
            <el-row>
                <el-col :offset=2 :span="8">
                    <el-container direction="vertical">
                        <el-tooltip class="item" effect="dark" content="流量耗尽后会暂停服务，重新购买流量包后即可恢复服务" placement="top-start">
                            <span style="font-weight: 700;color: #606266">当前剩余流量</span>
                        </el-tooltip>
                        <el-container style="margin-top: 5%">
                            <span style="font-weight: bolder;font-size: xx-large;color:#e70012 ">{{myBalance}}万</span>
                            <el-button type="primary" size="small" style="margin-left: 4%" v-on:click="toProduct">购买流量</el-button>
                        </el-container>
                    </el-container>
                </el-col>
                <el-col :offset=6 :span="8">
                    <el-container direction="vertical">
                        <el-tooltip class="item" effect="dark" content="流量耗尽后会暂停服务，重新购买流量包后即可恢复服务" placement="top-start">
                            <span style="font-weight: 700;color: #606266">领取免费流量</span>
                        </el-tooltip>
                        <el-container style="margin-top: 5%">
                            <span style="font-weight: bolder;font-size: xx-large;color:#e70012 ">1万</span>
                            <el-button type="primary" size="small" style="margin-left: 4%" v-on:click="getfree">点击领取</el-button>
                        </el-container>
                    </el-container>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="width: 100%; height: 70%;margin-top: 1%" body-style="padding-top:0;">
            <div slot="header" class="clearfix">
                <span style="font-weight: bolder">我的流量包</span>
            </div>
            <el-table
                    max-height="350px"
                    border
                    :data="packetList"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="user_package_id"
                        label="流量包id"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="package_name"
                        label="产品名称"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="start_time"
                        label="开始时间"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="end_time"
                        label="到期时间"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="use_status"
                        label="使用情况"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="package_status"
                        label="包状态"
                        min-width="80">
                </el-table-column>
            </el-table>
        </el-card>
    </el-container>
</template>

<script>
    export default {
        name: "MyBalancePage",
        created(){
            this.getuserpkg()
        },
        data(){
            return{
                packetList:[],
                myBalance:null,
            }
        },
        methods:{
            toProduct(){
                this.$router.push('product')
            },
            getfree(){
                this.$axios.get('/getfree').then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"领取成功"
                        });
                        this.getuserpkg()
                    }else {
                        this.$message.error("不可重复领取")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            getuserpkg(){
                this.$axios.get('/getuserpkg').then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.packetList = res.data.packages;
                        this.myBalance = (res.data.available/10000).toFixed(2);
                    }else if(res.data.return_msg==="获取流量包失败"){
                        this.packetList = [];
                        this.myBalance = 0;
                    }
                    else {
                        this.$message.error("获取用户流量包失败，请重新登入");
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
