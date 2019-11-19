<template>
    <el-container style="width: 100%" direction="vertical">
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
                        <span style="font-size: 0.8rem">{{ scope.row.productname }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="字符数量"
                        min-width="80"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.charnum }}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="100"
                                 label="产品数量"
                                 align="center">
                    <template slot-scope="scope">
                        <el-input-number  size="mini" style="width: 80%" v-model="scope.row.productnum" :min="1" :max="1" label="描述文字"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        label="字符总数量"
                        min-width="100"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.productnum * scope.row.charnum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="单价(元)"
                        min-width="60"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.productprice }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="有效时间"
                        min-width="80"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.time }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="总价(元)"
                        min-width="60"
                        align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.productnum * scope.row.productprice }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
        <el-container>
            <span></span>
            <el-button style="float: right" v-on:click="commit" size="medium" type="primary">提交订单</el-button>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "CommitOrder",
        created(){
            let data = this.$store.state.productState.orderList;
            this.tableData = [];
            this.tableData.push(data);
            if(this.tableData[0].productnum === undefined){
                this.$router.push("product")
            }
        },
        data() {
            return {
                tableData: [
                ]
            }
        },
        methods: {
            commit(){
                if(this.tableData[0].productnum === undefined){
                    this.$router.push("product")
                }
                else {
                    let url = "/purchaseorder/"+this.tableData[0].packetid;
                    this.$axios.get(url).then(res=>{
                        if (res.data.return_code === "SUCCESS"){
                            let info = res.data;
                            this.$store.commit("push", info);
                            this.$store.commit("ToPay");
                        }else {
                            this.$message("购买出错请刷新或重新登入");
                            this.$store.commit("logout");
                            this.$router.push("login")
                        }
                    }).catch(res=>{
                        this.$message("购买出错请刷新或重新登入")
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .span{
        font-size: 0.8rem;
    }
</style>
