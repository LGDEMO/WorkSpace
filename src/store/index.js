import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        loginState:{
          login:true
        },
        productState:{
            index:1,
            state:"commit",
            orderList:{},
            payOrderId:null
        },
        invoiceState:{
            index:1,
            state:"invoiceAddress",
            requestList:[],
        }
    },
    mutations:{
        login(state){
            state.loginState.state = true
        },
        logout(state){
            state.loginState.state = false
        },
        orderReserve(state){
            state.productState.index = 1;
            state.productState.state = "commit";
            state.productState.orderList = {}
        },
        push(state,data){
            state.productState.orderList = data;
        },
        ToPay(state){
            state.productState.index = 2;
            state.productState.state = "pay"
        },
        CancelPay(state){
            state.productState.index = 1;
            state.productState.state = "commit";
            state.productState.orderlist={};
            state.productState.payOrderId = null
        },
        WeChatPay(state, payOrderId){
            state.productState.index = 2;
            state.productState.state = "weChatPay";
            state.productState.payOrderId = payOrderId
        },
        setOrderList(state, data){
            state.productState.orderList = data;
        },
        invoiceAddress(state){
            state.invoiceState.state = 'invoiceAddress'
        },
        requestInvoice(state, data){
            state.invoiceState.state = 'requestInvoice';
            state.invoiceState.requestList = data;
        },
        commitInvoice(state){
            state.invoiceState.state = 'commitInvoice'
        },
        invoiceInfo(state){
            state.invoiceState.state = 'invoiceInfo'
        },
        invoiceList(state){
            state.invoiceState.state = 'invoiceList'
        },
    }
});

export default store
