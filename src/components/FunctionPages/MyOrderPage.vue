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
                    border
                    style="width: 100%;margin-top: 1%">
                <el-table-column
                        prop="order_id"
                        align="center"
                        label="订单号"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="package_name"
                        label="产品名称"
                        align="center"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="创建时间"
                        align="center"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="订单金额(元)"
                        align="center"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="订单状态"
                        align="center"
                        min-width="50">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==='未生效'" style="color: #e70012">{{scope.row.status}}</span>
                        <span v-if="scope.row.status!=='未生效'" >{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="detailView(scope.row)" type="text" size="small">详情</el-button>
                        <el-button type="text" size="small" v-if="scope.row.status==='未生效'" v-on:click="Pay(scope.row)">支付</el-button>
                        <el-button type="text" size="small" v-on:click="chooseDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 1%" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="showdata.page" :page-sizes="[10, 20,50]" :page-size="showdata.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="showdata.total">
            </el-pagination>
        </div>
        <el-drawer
                title="订单详情"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose">
            <span>{{orderDetail}}</span>
        </el-drawer>
        <el-dialog title="确认删除" :visible.sync="dialogTable2Visible">
            <span>删除后将不可恢复</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTable2Visible = false">取 消</el-button>
                <el-button type="primary" @click="Delete">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
    export default {
        name: "MyOrderPage",
        created() {
            this.pageList()
        },
        methods: {
            handleClose(done) {
                done();
            },
            detailView(data){
                // eslint-disable-next-line no-console
                this.orderDetail = data.orderId;
                this.drawer = true
            },
            Pay(data){
                this.$router.push("productOrder");
                this.$store.commit("WeChatPay", data.orderId)
            },
            chooseDelete(data){
                this.delOrder = data.order_id;
                this.dialogTable2Visible = true
            },
            Delete(){
                let url = "/delorder/" + this.delOrder
                this.$axios.get(url).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.dialogTable2Visible = false;
                        this.pageList()
                    }else {
                        this.$message.error("删除失败,请重新登入");
                        this.$router.push("login")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            pageList() {
                // 发请求拿到数据并暂存全部数据,方便之后操作
                this.$axios.get("/showorder").then(res=>{
                    if (res.data.records==="0"){
                        this.$message({
                            type:"warning",
                            message:"无订单"
                        });
                        this.showdata.data = [];
                        this.getList()
                    } else if (res.data.return_code==="SUCCESS"){
                        this.showdata.data = res.data.orders;
                        this.getList()
                    } else {
                        this.$message("请登入");
                        this.$router.push("login");
                        this.$store.commit("logout")
                    }
                }).catch(res=>{
                    this.$message("系统出错")
                });
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
            }
        },
        data() {
            return {
                showdata:{
                    list: [],
                    data: [],
                    limit: 20,
                    total: null,
                    page: 1,
                    searchData: "",
                },
                dialogTable1Visible:false,
                dialogTable2Visible:false,
                drawer: false,
                direction: 'rtl',
                orderDetail:null,
                delOrder:null,
            };
        }
    }
</script>

<style scoped>

</style>
