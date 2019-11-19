<template>
  <el-container style="background-color: #eeeeee; height: 100%; min-width: 1280px;min-height: 800px">
    <el-dialog title="请输入您的建议" :visible.sync="dialogFormVisible">
      <el-input autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-header style="margin-top: 0; height: 11%; background-color: white;box-shadow:0 0 10px rgba(0, 0, 0, .2)">
      <el-row style="width:100%;margin-left: 1%;margin-top: 1.2%">
        <el-col :span=4>
          <img :src="imgUrl" width="150rem" height="48rem" style="margin-top: 2%">
        </el-col>
        <el-col :span=20>
          <el-container style="float: right;margin-right: 2%">
            <el-menu  class="el-menu-demo" mode="horizontal" style="border-bottom-width: 0; font-weight: bolder">
              <el-menu-item index="1-1" v-on:click="dialogFormVisible=true">在线咨询</el-menu-item>
              <el-menu-item index="1-2" v-on:click="toMyOrder">我的订单</el-menu-item>
              <el-menu-item index="1-3" v-on:click="toUserInfo"><el-container style="vertical-align: middle">
                <img :src="userimg" width="30" height="30" style="margin-top: 50%">
              </el-container></el-menu-item>
            </el-menu>
          </el-container>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="padding: 0;margin-top: 1.5%;height: 60%">
      <el-aside style="height:100%;width: 200px;box-shadow:0 0 10px rgba(0, 0, 0, .2)">
        <el-menu
                theme="light"
                class="el-menu-vertical-demo"
                text-color="#000000"
                :unique-opened = true
                active-text-color="black"
                :style="menuStyle">
          <el-menu-item index="1" v-on:click="toTrans">
            <i class="iconfont icon-chat" style="margin-left: 10%; font-size: 20px;padding: 5px;color: black"></i>
            <span>文本翻译</span>
          </el-menu-item>
          <el-submenu index="2" style="width:100%; margin: 0;">
            <template slot="title">
              <i class="iconfont icon-mg-plan" style="margin-left: 10%; font-size: 20px;padding: 5px;color: black"></i>
              <span>资源管理</span>
            </template>
            <el-menu-item index="2-1" style="margin: 0;padding: 0;width: 100%;text-align: center" v-on:click="toItem">术语词典</el-menu-item>
            <el-menu-item index="2-2" style="margin: 0;padding: 0;width: 100%;text-align: center" v-on:click="toMemory">翻译记忆</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" v-on:click="toProduct">
            <i  class="iconfont icon-mg-baseinfo" style="margin-left: 10%; font-size: 20px;padding: 5px;color: black"></i>
            <span>产品服务</span>
          </el-menu-item>
          <el-menu-item index="5" v-on:click="toMyOrder">
            <i class="iconfont icon-materielinfo" style="margin-left: 10%; font-size: 20px;padding: 5px;color: black"></i>
            <span>我的订单</span>
          </el-menu-item>
          <el-submenu index="4" style="width:100%; margin: 0;">
            <template slot="title">
              <i class="iconfont icon-mg-baseset" style="margin-left: 10%; font-size: 20px;padding: 5px;color: black"></i>
              <span>发票管理</span>
            </template>
            <el-menu-item index="4-1" style="margin: 0;padding: 0;width: 100%;text-align: center" v-on:click="toInvoiceAddress">收货地址</el-menu-item>
            <el-menu-item index="4-2" style="margin: 0;padding: 0;width: 100%;text-align: center" v-on:click="toRequestInvoice">索取发票</el-menu-item>
            <el-menu-item index="4-3" style="margin: 0;padding: 0;width: 100%;text-align: center" v-on:click="toInvoiceInfo">发票信息</el-menu-item>
            <el-menu-item index="4-3" style="margin: 0;padding: 0;width: 100%;text-align: center" v-on:click="toInvoiceList">我的发票</el-menu-item>
          </el-submenu>
          <el-menu-item index="6" v-on:click="toMyBalance">
            <i class="iconfont icon-organcode" style="margin-left: 10%; font-size: 20px;padding: 5px;color: black"></i>
            <span>我的流量</span>
          </el-menu-item>
          <el-menu-item index="7" v-on:click="toUserInfo">
            <i class="iconfont icon-home" style="margin-left: 10%; font-size: 20px;padding: 5px;color: black"></i>
            <span>个人信息</span>
          </el-menu-item>
          <el-menu-item index="7" v-on:click="logout">
            <i class="iconfont icon-mrpcount" style="margin-left: 10%; font-size: 20px;padding: 5px;color: black"></i>
            <span>退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main :style='mainStyle' >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // import TranslationPage from "@/components/FunctionPages/TranslationPage";
  // import ProductPage from "./FunctionPages/ProductPage";

  export default {
    components:{
      // TranslationPage:TranslationPage,
      // ProductPage:ProductPage,
    },
    name: 'Index',
    data(){
      return{
        dialogFormVisible:false,
        pageindex:1,
        imgUrl:require('../assets/img/gang.png'),
        userimg:require('../assets/img/2.png'),
        mainStyle: {
          "box-shadow":"0 0 15px rgba(0, 0, 0, .2)",
          height:"100%",
          marginLeft: "1.5%",
          marginRight: "1.5%",
          backgroundImage: "url(" + require("../assets/img/13.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto auto",
        },
        menuStyle:{
          backgroundImage: "url(" + require("../assets/img/3.png") + ")",
          overflow:"visible",
          height: "100%",
          "border-right-width":"2px",
          "border-right-color": "#e70012",
          "border-right-style": "solid"
        },
      }
    },
    created(){
      this.$axios.get("/auto").then(res=>{
        if (res.data.return_code==="SUCCESS"){
          this.$store.commit("login")
        }else {
          this.$message({
            type:"warning",
            message:"您未登入，请先登入"
          });
          this.$store.commit("logout");
          this.$router.push('login')
        }
      }).catch(res=>{
        this.$message("系统错误")
      });
    },
    methods:{
      toUserInfo(){
        this.$router.push('userInfo')
      },
      toMyBalance(){
        this.$router.push('myBalance')
      },
      toTrans(){
        this.$router.push('/translation')
      },
      toProduct(){
        this.$router.push('product')
      },
      toMyOrder(){
        this.$router.push('myOrder')
      },
      toInvoiceAddress(){
        this.$router.push('invoiceAddress')
      },
      toRequestInvoice(){
        this.$router.push('requestInvoice')
      },
      toInvoiceInfo(){
        this.$router.push('invoiceInfo')
      },
      toInvoiceList(){
        this.$router.push('invoiceList')
      },
      toItem(){
        this.$router.push('item')
      },
      toMemory(){
        this.$router.push('memory')
      },
      logout(){
        this.$axios.get('/logout').then(res=>{
          if (res.data.result===1){
            this.$store.commit("logout");
            this.$router.push('login');
            this.$message({
              type:"success",
              message:"登出成功"
            })
          }else {
            this.$message.error("登出失败")
          }
        }).catch(res=>{
          this.$message("系统错误")
        })
      }
    },
    props: {
      msg: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-submenu__title:hover {
    background: #d55fff !important;
  }
  /*.el-menu-item.is-active {*/
  /*  background-color: #e70012 !important;*/
  /*}*/
  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {

    min-width: 260px;

  }
</style>
