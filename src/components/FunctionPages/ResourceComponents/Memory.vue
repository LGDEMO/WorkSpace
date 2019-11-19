<template>
    <el-container direction="vertical">
        <el-card>
            <div slot="header" class="clearfix">
                <span style="font-weight: bolder">记忆词典</span>
                <el-container style="float: right">
                    <el-button style="padding: 5px 3px" type="primary" v-on:click="addFormVisible=true"><span style="font-weight: bolder">添加记忆</span></el-button>
                    <el-button style="padding: 5px 3px" type="warning" v-on:click="deletedAll"><span style="font-weight: bolder">批量删除</span></el-button>
                </el-container>
            </div>
            <div>
                <el-row :gutter=10>
                    <el-col :span=6>
                        <el-select v-model="showdata.searchData" placeholder="请选择语言方向" style="width: 100%">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
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
                            prop="src_text"
                            align="center"
                            label="源语言"
                            min-width="240">
                    </el-table-column>
                    <el-table-column
                            prop="tgt_text"
                            align="center"
                            label="目标语言"
                            min-width="240">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="翻译方向"
                            min-width="100">
                        <template slot-scope="scope">
                            <span>中文->{{langDict_1[scope.row.tgt_lang]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            align="center"
                            label="添加时间"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            width="120">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" v-on:click="deleted(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row style="margin-top: 1%">
                    <el-col :span=12>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="showdata.page" :page-sizes="[10, 20,50]" :page-size="showdata.limit"
                                       layout="total, sizes, prev, pager, next, jumper" :total="showdata.total">
                        </el-pagination>
                    </el-col>
                    <el-col :offset=10 :span=2>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-dialog title="添加记忆" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="语言方向">
                    <el-select v-model="addForm.tgt" placeholder="请选择语言方向" style="width: 100%">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="源语言">
                    <el-input v-model="addForm.srctext" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="目标语言">
                    <el-input v-model="addForm.tgttext" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-on:click="addItem">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
    export default {
        name: "Memory",
        data(){
            return{
                langDict_1:{},
                langDict_2:{},
                addFormVisible:false,
                addForm:{
                    mtype:1 ,
                    src:"zh",
                    tgt:"en",
                    srctext:null,
                    tgttext:null
                },
                options: [],
                showdata:{
                    list: [],
                    data: [],
                    limit: 20,
                    total: null,
                    page: 1,
                    searchData: "",
                },
                multipleSelection: []
            }
        },
        created() {
            this.getLangList();
        },
        methods: {
            getLangList(){
                this.$axios.get("/getlanglist").then(res=>{
                    let data = res.data;
                    for (let i=0; i<data.length; i++){
                        this.langDict_1[data[i].abbreviation] = data[i].language;
                        this.langDict_2[data[i].language] = data[i].abbreviation;
                        if (data[i].language!=="中文"){
                            this.options.push({label:"中文-"+data[i].language,value:data[i].abbreviation})
                        }
                    }
                    this.pageList()
                })
            },
            deleted(data){
                let url = "/delusermemory/"+data.memory_id;
                this.$axios.get(url).then(res=>{
                    if (res.data.return_code=="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"删除成功"
                        });
                        this.getLangList()
                    }else if (res.data.return_msg==="请先登入"){
                        this.$store.commit("logout");
                        this.$router.push('login');
                        this.$message({
                            type:"warning",
                            message:"请重新登入"
                        })
                    }else {
                        this.$message.error("删除失败")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            deletedAll(){
                let data = this.multipleSelection;
                let mids = "";
                for (let i=0; i<data.length; i++){
                    mids += data[i].memory_id + ","
                }
                let url = "/delusermemorys/" + mids;
                this.$axios.get(url).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"批量删除完成"
                        });
                        this.getLangList();
                    }else if (res.data.return_msg==="请先登入"){
                        this.$message({
                            type:"warning",
                            message:"请先登入"
                        });
                        this.$store.commit("logout");
                        this.$router.push("login");
                    }else {
                        this.$message.error("删除失败")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                });
                this.getLangList()
            },
            addItem(){
                this.$axios.post("/usermemoryadd", this.addForm).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"添加记忆成功",
                        });
                        this.addFormVisible = false,
                            this.addForm.tgttext = null,
                            this.addForm.srctext = null,
                            this.addForm.tgt = "en"
                            this.getLangList()
                    }else {
                        this.$message.error("添加记忆失败")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })

            },
            pageList() {
                // 发请求拿到数据并暂存全部数据,方便之后操作
                this.$axios.get("/getusermemory/1/0/99999").then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        let data = res.data.memorys;
                        this.showdata.data=data;
                        this.getList()
                    }else if (res.data.return_msg==="请先登入"){
                        this.$store.commit("logout");
                        this.$router.push('login');
                        this.$message({
                            type:"warning",
                            message:"请重新登入"
                        })
                    }else if (res.data.return_msg==="信息获取失败"){
                        this.showdata.data=[];
                        this.getList();
                    }else{
                        this.$message(res.data.return_msg)
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            getList() {
                let list = this.showdata.data.filter((item, index) =>
                    item.tgt_lang.includes(this.showdata.searchData)
                );
                this.showdata.list = list.filter((item, index) =>
                    index < this.showdata.page * this.showdata.limit && index >= this.showdata.limit * (this.showdata.page - 1)
                ),
                    this.showdata.total = list.length
            },
            handleSizeChange(val) {
                this.showdata.limit = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.showdata.page = val;
                this.getList()
            },
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
            },
            requestInvoice(){
                if (this.multipleSelection.length>0){
                    this.$store.commit("requestInvoice",this.multipleSelection);
                    this.$router.push("commitInvoice")
                }else {
                    this.$message.error("请至少选择一条记忆")
                }
            }
        }
    }
</script>

<style scoped>

</style>
