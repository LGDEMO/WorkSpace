<template>
    <el-container direction="vertical">
        <el-container style="height: 10%">
            <el-row style="width: 100%; height: 5%">
                <el-col :span=20>
                    <h3>产品服务</h3>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="height: 60%;width: 100%">
            <el-row style="width: 100%" :gutter=10 type="flex">
                <el-col :span=4 style="height: 100%">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-weight: bolder;color:#e70012">产品型号</span>
                        </div>
                        <div class="text item">
                            <span style="font-weight: bolder;color:#e70012">支付类型</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span style="font-weight: bolder;color:#e70012">流量包规格</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span style="font-weight: bolder;color:#e70012">流量包长度</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span style="font-weight: bolder;color:#e70012">价格</span>
                        </div>
                        <el-divider></el-divider>
                        <el-container direction="vertical" style="margin-top: 20.5%;margin-bottom: 37%">
                            <span style="font-weight: bolder;color:#e70012">数量</span>
                        </el-container>
                    </el-card>
                </el-col>
                <el-col :span=4>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-weight: bolder">{{packages[1][1]}}</span>
                        </div>
                        <div class="text item">
                            <span>预付</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[1][2]}} M</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[1][3]}} 月</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[1][4]}} 元</span>
                        </div>
                        <el-divider></el-divider>
                        <el-container direction="vertical">
                            <el-input-number v-model="num" :min="1" :max="10" size="small" label="描述文字" style="margin-left: 6%;width: 90%"></el-input-number>
                            <el-button style="width: 91%;margin-left: 6%;margin-top: 5%" size="medium" type="primary" v-on:click="to_order(1)">确认购买</el-button>
                        </el-container>
                    </el-card>
                </el-col>
                <el-col :span=4>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-weight: bolder">{{packages[2][1]}}</span>
                        </div>
                        <div class="text item">
                            <span>预付</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[2][2]}} M</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[2][3]}} 月</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[2][4]}} 元</span>
                        </div>
                        <el-divider></el-divider>
                        <el-container direction="vertical">
                            <el-input-number v-model="num" :min="1" :max="10" size="small" label="描述文字" style="margin-left: 6%;width: 90%"></el-input-number>
                            <el-button style="width: 91%;margin-left: 6%;margin-top: 5%" size="medium" type="primary" v-on:click="to_order(2)">确认购买</el-button>
                        </el-container>
                    </el-card>
                </el-col>
                <el-col :span=4>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-weight: bolder">{{packages[3][1]}}</span>
                        </div>
                        <div class="text item">
                            <span>预付</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[3][2]}} M</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[3][3]}} 月</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[3][4]}} 元</span>
                        </div>
                        <el-divider></el-divider>
                        <el-container direction="vertical">
                            <el-input-number v-model="num" :min="1" :max="10" size="small" label="描述文字" style="margin-left: 6%;width: 90%"></el-input-number>
                            <el-button style="width: 91%;margin-left: 6%;margin-top: 5%" size="medium" type="primary" v-on:click="to_order(3)">确认购买</el-button>
                        </el-container>
                    </el-card>
                </el-col>
                <el-col :span=4>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-weight: bolder">{{packages[4][1]}}</span>
                        </div>
                        <div class="text item">
                            <span>预付</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[4][2]}} M</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[4][3]}} 月</span>
                        </div>
                        <div class="text item" style="margin-top: 10%">
                            <span>{{packages[4][4]}} 元</span>
                        </div>
                        <el-divider></el-divider>
                        <el-container direction="vertical">
                            <el-input-number v-model="num" :min="1" :max="1" size="small" label="描述文字" style="margin-left: 6%;width: 90%"></el-input-number>
                            <el-button style="width: 91%;margin-left: 6%;margin-top: 5%" size="medium" type="primary" v-on:click="to_order(4)">确认购买</el-button>
                        </el-container>
                    </el-card>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="margin-top: 2%" direction="vertical">
            <span style="color: #666">温馨提示：</span>
            <span style="color: #666">1）支持多种语言间的实时互译；</span>
            <span style="color: #666">2）每月翻译所需字符超过十亿可享折扣价格，折扣详情请联系客服；</span>
            <span style="color: #666">3）若您遇到其他问题请及时联系客服</span>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "SelectProduct",
        created(){
            this.$axios.get("/getpackages").then(res=>{
                this.packages = res.data.result
            }).catch(res=>{
                this.$message("流量包获取失败")
            })
        },
        data(){
            return{
                packages:[
                ],
                num: 1,
                img:require('../../../assets/img/12.png')
            }
        },
        methods:{
            to_order(index){
                this.$store.commit("orderReserve");
                this.$store.commit("setOrderList",{packetid:this.packages[index][0],productname: this.packages[index][1], charnum: this.packages[index][2], productnum: 1, productprice: this.packages[index][4],time:this.packages[index][3]})
                this.$router.push("productOrder")
            }
        }
    }
</script>

<style scoped>
    .el-card__header {
        padding: 18px 20px;
        border-bottom: 1px solid #EBEEF5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: yellow !important;
    }
</style>
