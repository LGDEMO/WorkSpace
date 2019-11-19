<template>
    <el-container direction="vertical">
        <el-container style="height: 10%">
            <el-row style="width: 100%; height: 5%">
                <el-col :span=20>
                    <h3>产品服务</h3>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="padding: 3%;padding-bottom: 1%">
            <el-steps :active="this.$store.state.productState.index" style="width: 100%">
                <el-step title="确认订单"></el-step>
                <el-step title="支付"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
        </el-container>
        <el-container style="padding: 3%;padding-top: 0; background: white">
            <CommitOrder v-if="this.$store.state.productState.state==='commit'"></CommitOrder>
            <PayOrder v-if="this.$store.state.productState.state==='pay'"></PayOrder>
            <WeChatPay v-if="this.$store.state.productState.state==='weChatPay'"></WeChatPay>
        </el-container>
    </el-container>
</template>

<script>
    import CommitOrder from "./CommitOrder";
    import PayOrder from "./PayOrder";
    import WeChatPay from "./WeChatPay";
    export default {
        name: "ProductOrder",
        data() {
            return {
            };
        },
        components:{
            CommitOrder:CommitOrder,
            PayOrder:PayOrder,
            WeChatPay:WeChatPay
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
