<template>
    <el-container direction="vertical">
        <div>
            <el-row :gutter=10>
                <el-col :span=6>
                    <el-input v-model="showdata.searchData" placeholder="输入订单号检索">></el-input>
                </el-col>
                <el-col :span=2>
                    <el-container>
                        <el-button type="primary" v-on:click="search"><span style="font-weight: bolder">开始检索</span></el-button>
                        <el-button type="primary" v-on:click="cancelSearch"><span style="font-weight: bolder">显示所有</span></el-button>
                    </el-container>
                </el-col>
            </el-row>
            <el-table
                    ref="multipleTable"
                    :data="showdata.list"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top: 1%"
                    border
                    @selection-change="handleSelectionChange">
                <el-table-column
                        align="center"
                        type="selection"
                        min-width="20">
                </el-table-column>
                <el-table-column
                        prop="order_id"
                        align="center"
                        label="订单号"
                        min-width="240">
                </el-table-column>
                <el-table-column
                        prop="price"
                        align="center"
                        label="订单金额"
                        min-width="80">
                </el-table-column>
                <el-table-column
                        prop="time"
                        align="center"
                        label="订单支付时间"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="package_name"
                        align="center"
                        label="订单详情"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="invoice"
                        align="center"
                        label="订单状态"
                        min-width="100">
                </el-table-column>
            </el-table>
            <el-row style="margin-top: 1%">
                <el-col :span=11>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="showdata.page" :page-sizes="[10,20,50]" :page-size="showdata.limit"
                                   layout="total, sizes, prev, pager, next, jumper" :total="showdata.total">
                    </el-pagination>
                </el-col>
                <el-col :offset=8 :span=3>
                    <el-container direction="vertical">
                        <span style="color:#e70012;font-weight: 600;"> ￥已选择{{this.selectMoney}}元发票</span>
                        <span style="color:#606266;font-weight: 600;"> ￥共可开{{showdata.list[0].sum_price}}元发票</span>
                    </el-container>
                </el-col>
                <el-col :span=2>
                    <el-container direction="vertical">
                        <el-button type="primary" v-on:click="requestInvoice">索取发票</el-button>
                    </el-container>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<script>
    export default {
        name: "RequestInvoice",
        data(){
            return{
                showdata:{
                    list: [],
                    data: [],
                    limit: 20,
                    total: null,
                    page: 1,
                    searchData: "",
                },
                selectMoney:0,
                multipleSelection: []
            }
        },
        created() {
            this.pageList()
        },
        methods: {
            pageList() {
                // 发请求拿到数据并暂存全部数据,方便之后操作
                this.$axios.get("/getinvoice").then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.showdata.data = res.data.orders;
                        this.getList()
                    }else if (res.data.return_msg==="无可开票订单"){
                        this.showdata.data = [];
                        this.$message({
                            type:"warning",
                            message:"无可开票订单"
                        })
                    } else {
                        this.$message.error("订单获取失败,请重新登入");
                        this.$store.commit("logout");
                        this.$router.push("login")
                    }
                }).catch(res=>{
                    console.log(res)
                    this.$message("系统错误")
                })
            },
            // 处理数据
            getList() {
                // es6过滤得到满足搜索条件的展示数据list
                // eslint-disable-next-line no-unused-vars
                let list = this.showdata.data.filter((item, index) =>
                    item.order_id.includes(this.showdata.searchData)
                );
                this.showdata.list = list.filter((item, index) =>
                    index < this.showdata.page * this.showdata.limit && index >= this.showdata.limit * (this.showdata.page - 1)
                ),
                    this.showdata.total = list.length
            },
            // 当每页数量改变
            handleSizeChange(val) {
                this.showdata.limit = val
                this.getList()
            },
            // 当当前页改变
            handleCurrentChange(val) {
                this.showdata.page = val;
                this.getList()
            },
            // 搜索过滤数据
            search() {
                this.showdata.page = 1;
                this.getList()
            },
            cancelSearch(){
                this.showdata.searchData = "";
                this.getList()
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.selectMoney = 0;
                for (let i=0; i<val.length; i++){
                    this.selectMoney += parseInt(val[i].price)
                }
            },
            requestInvoice(){
                if (this.multipleSelection.length>0){
                    this.$store.commit("requestInvoice",this.multipleSelection);
                    this.$router.push("commitInvoice")
                }else {
                    this.$message.error("请至少选择一条订单")
                }
            }
        }
    }
</script>

<style scoped>

</style>
