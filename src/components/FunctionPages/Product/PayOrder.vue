<template>
    <el-container direction="vertical">
        <el-container>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    border>
                <el-table-column
                        label="产品名"
                        min-width="80"
                        align="center">
                    <template slot-scope="scope">
                        <span style="font-size: 0.8rem">{{ scope.row.package_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="100"
                                 label="订单号"
                                 align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.order_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="总价(元)"
                        min-width="60"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.price }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
        <el-container>
            <el-button v-on:click="Pay">确认支付</el-button>
            <el-button v-on:click="CancelPay">取消支付</el-button>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "PayOrder",
        created() {
            let data = this.$store.state.productState.orderList;
            this.tableData = [];
            this.tableData.push(data);
        },
        data(){
            return{
                dialogTableVisible:false,
                tableData:[]
            }
        },
        methods:{
            Pay(){
                this.$axios.post("/wechatinterface",this.tableData[0]).then(res=>{
                })
                // this.$store.commit("WeChatPay", "1233453453645645654")
            },
            CancelPay(){
                this.$router.push("product")
            }
        }
    }
</script>

<style scoped>

</style>
