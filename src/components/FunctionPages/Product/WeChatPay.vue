<template>
    <el-container>
        <el-card :body-style="{ padding: '1%',paddingTop: '0' }" style="width: 100%">
            <el-row>
                <el-col :span=20>
                    <h4 style="color: #e70012">
                        订单{{payOrderId}}提交成功,请扫码支付XX元
                    </h4>
                </el-col>
                <el-col :span=4>
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <el-button type="text" class="button" v-on:click="CancelPay">取消支付</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset=2 :span=10>
                    <img :src="wximg" class="image" style="margin-top: 10%">
                </el-col>
                <el-col :offset=2 :span=10>
                    <img :src="sjimg" class="image">
                </el-col>
            </el-row>
        </el-card>
    </el-container>
</template>

<script>
    export default {
        name: "WeChatPay",
        created(){
            this.payOrderId = this.$store.state.productState.payOrderId
        },
        data(){
            return{
                payOrderId:null,
                sjimg:require("../../../assets/img/sj.png"),
                wximg:require("../../../assets/img/ewm.png")
            }
        },
        methods:{
            CancelPay(){
                this.$router.push("product")
            }
        }
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
