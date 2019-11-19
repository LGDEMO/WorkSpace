<template>
    <el-container direction="vertical">
        <el-dialog title="输入个人信息" :visible.sync="dialogTableVisible">
            <h4>收件人姓名:</h4>
            <el-input placeholder="请输入收件人姓名" v-model="inputData.name"></el-input>
            <h4>联系方式:</h4>
            <el-input placeholder="请输入联系方式" v-model="inputData.phone"></el-input>
            <h4>选择区域:</h4>
            <el-cascader
                    style="width: 100%"
                    size="large"
                    :options="options"
                    v-model="inputData.address">
            </el-cascader>
            <h4>输入详细地址:</h4>
            <el-input placeholder="请输入详细地址" v-model="inputData.detail"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button v-on:click="dialogTableVisible=false">取 消</el-button>
                <el-button type="primary" v-on:click="addAddress">确 定</el-button>
            </div>
        </el-dialog>
        <el-button type="text" v-on:click="dialogTableVisible=true" style="width: 5%;padding: 2%"><span style="font-weight: bolder;font-size: 1rem">添加地址</span></el-button>
        <el-container style="width: 100%">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="name"
                        label="收件人姓名"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phone"
                        label="联系方式"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        label="收件地区"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="detail"
                        label="详细地址"
                        min-width="300">
                </el-table-column>
                <el-table-column
                        align="default_code"
                        prop="addressStatus"
                        label="状态"
                        min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.default_code==='1'" style="color: #e70012">默认地址</span>
                        <span v-if="scope.row.default_code!=='1'" >非默认地址</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-button type="text" size="medium" v-on:click="setDefault(scope.row)" v-if="scope.row.default_code!=='1'">设为默认</el-button>
                        <el-button type="text" size="medium" v-on:click="deleteAddress(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
    </el-container>
</template>

<script>
    import { regionData, CodeToText } from 'element-china-area-data'
    export default {
        name: "InvoiceAddress",
        data(){
            return {
                dialogTableVisible:false,
                options: regionData,
                selectedOptions: [],
                inputData:{
                    name: null,
                    phone: null,
                    address: null,
                    detail: null
                },
                tableData: []
            }
        },
        created(){
            this.getAddress()
        },
        methods:{
            addAddress(){
                let Address = '';
                for(let i=0; i<this.inputData.address.length; i++){
                    Address += CodeToText[this.inputData.address[i]]
                }
                this.inputData.address = Address;
                this.$axios.post("/setaddress",this.inputData).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"添加成功"
                        });
                        this.getAddress()
                    }else {
                        this.$message.error("添加失败,请重新登入");
                        this.$store.commit("logout");
                        this.$router.push("login")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                });
                this.dialogTableVisible=false;
                this.inputData = {
                    name: null,
                    phoneNumber: null,
                    address: null,
                    detail: null
                }
            },
            deleteAddress(data){
                this.$axios.post("/deladdress",{addressid:data.address_id}).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            type:"success",
                            message:"删除成功"
                        });
                        this.getAddress()
                    }else {
                        this.$message.error("删除失败")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            setDefault(data){
                let url = "/setdefaddr/" + data.address_id;
                this.$axios.get(url).then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        });
                        this.getAddress()
                    }else {
                        this.$message.error("设置失败,请重新登入");
                        this.$store.commit("logout");
                        this.$router.push("login")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            getAddress(){
                this.$axios.get('/getaddress').then(res=>{
                    if (res.data.return_code==="SUCCESS"){
                        this.tableData = res.data.addresses;
                    }else if (res.data.return_msg==="获取地址信息失败"){
                        this.$message.error("无地址信息");
                        this.tableData = []
                    }
                    else {
                        this.$message.error("获取用户地址错误,请重新登入");
                        this.$store.commit("logout");
                        this.$router.push("login")
                    }
                }).catch(res=>{
                    this.$message("系统错误")
                })
            },
            // eslint-disable-next-line no-unused-vars
            editAddress(data, index){
                this.inputData.name = data.name;
                this.inputData.phoneNumber = data.phoneNumber;
                this.dialogTableVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>
