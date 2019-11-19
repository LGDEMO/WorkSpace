<template>
    <el-container direction="vertical">
        <div>
            <el-row :gutter="10">
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
                    :data="showdata.list"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top: 1%"
                    border
            >
                <el-table-column
                        prop="company"
                        align="center"
                        label="公司"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="invoice_id"
                        align="center"
                        label="订单号"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="price"
                        align="center"
                        label="金额(元)"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="time"
                        align="center"
                        label="时间"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="status"
                        align="center"
                        label="发票状态"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="type1"
                        align="center"
                        label="发票类型"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="type2"
                        align="center"
                        label="开票方式"
                        min-width="100">
                </el-table-column>
            </el-table>
            <el-row style="margin-top: 1%">
                <el-col :span=12>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="showdata.page" :page-sizes="[10, 20,50]" :page-size="showdata.limit"
                                   layout="total, sizes, prev, pager, next, jumper" :total="showdata.total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<script>
    export default {
        name: "InvoiceList",
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
            }
        },
        created() {
            this.pageList()
        },
        methods: {
            pageList() {
                // 发请求拿到数据并暂存全部数据,方便之后操作
                this.$axios.get("/showinvoice").then(res=>{
                    if (res.data.return_msg==="无发票信息"){
                        this.$message({
                            type:"warning",
                            message:"无发票信息"
                        })
                    }else if (res.data.return_code==="SUCCESS"){
                        this.showdata.data = res.data.invoices;
                        this.getList()
                    }else {
                        this.$message.error("获取数据失败，请重新登入");
                        this.$store.commit("logout");
                        this.$router.push("login")
                    }
                }).catch(res=>{
                    // eslint-disable-next-line no-console
                    this.$message("系统错误")
                })
            },
            // 处理数据
            getList() {
                // es6过滤得到满足搜索条件的展示数据list
                // eslint-disable-next-line no-unused-vars
                let list = this.showdata.data.filter((item, index) =>
                    item.invoice_id.includes(this.showdata.searchData)
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
        }
    }
</script>

<style scoped>

</style>
