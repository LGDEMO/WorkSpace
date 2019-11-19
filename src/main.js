import Vue from "vue"
import ElementUI from "element-ui";
import "./assets/style/theme/index.css";
import App from "./App.vue"
import "./assets/icon/iconfont.css"
import axios from "axios"
import store from "./store";
import VueRouter from "vue-router";
import ProductOrder from "./components/FunctionPages/Product/ProductOrder";
import SelectProduct from "./components/FunctionPages/Product/SelectProduct";
import index from "./components/index"
import TranslationPage from "./components/FunctionPages/TranslationPage";
import ProductPage from "./components/FunctionPages/ProductPage";
import MyOrderPage from "./components/FunctionPages/MyOrderPage";
import InvoicePage from "./components/FunctionPages/InvoicePage";
import RequestInvoice from "./components/FunctionPages/Invoice/RequestInvoice";
import InvoiceAddress from "./components/FunctionPages/Invoice/InvoiceAddress";
import CommitInvoice from "./components/FunctionPages/Invoice/CommitInvoice";
import InvoiceInfo from "./components/FunctionPages/Invoice/InvoiceInfo";
import InvoiceList from "./components/FunctionPages/Invoice/InvoiceList";
import MyBalancePage from "./components/FunctionPages/MyBalancePage";
import UserInfoPage from "./components/FunctionPages/UserInfoPage";
import ResourcePage from "./components/FunctionPages/ResourcePage";
import Item from "./components/FunctionPages/ResourceComponents/Item";
import Memory from "./components/FunctionPages/ResourceComponents/Memory";
import home from "./components/home"
import login from "./components/login";

Vue.use(ElementUI);
Vue.use(VueRouter);
const routes = [
  {
    path:"/",
    name:"home",
    component:home,
    redirect:"/index",
    children:[
      {
        path:"/login",
        name:"login",
        component: login,
        meta: {
          isLogin: false
        }
      },
      {
        path:"/index",
        name:"index",
        component:index,
        redirect:"/translation",
        meta:{
          isLogin: true
        },
        children:[
          {
            path:"/resource",
            name:"resource",
            component:ResourcePage,
            meta:{
              isLogin: true
            },
            children:[
              {
                path:"/item",
                name:"item",
                component:Item,
                meta:{
                  isLogin: true
                },
              },
              {
                path:"/memory",
                name:"memory",
                component:Memory,
                meta:{
                  isLogin: true
                },
              }
            ]
          },
          {
            path:"/userInfo",
            name:"userInfo",
            component:UserInfoPage,
            meta:{
              isLogin: true
            },
          },
          {
            path:"/translation",
            name:"translation",
            component: TranslationPage,
            meta:{
              isLogin: true
            },
          },
          {
            path:"/myBalance",
            name:"myBalance",
            component: MyBalancePage,
            meta:{
              isLogin: true
            },
          },
          {
            path:"/product",
            name:"product",
            component:ProductPage,
            redirect:"/selectProduct",
            meta:{
              isLogin: true
            },
            children:[
              {
                path:"/selectProduct",
                name:"selectProduct",
                component:SelectProduct,
                meta:{
                  isLogin: true
                },
              },
              {
                path:"/productOrder",
                name: "productOrder",
                component: ProductOrder,
                meta:{
                  isLogin: true
                },
              },
              {
                path:"/weChatPay",
                name:"weChatPay",
                meta:{
                  isLogin: true
                },
              }
            ]
          },
          {
            path:"/myOrder",
            name:"myOrder",
            component:MyOrderPage,
            meta:{
              isLogin: true
            },
          },
          {
            path:"/invoice",
            name:"invoice",
            component:InvoicePage,
            meta:{
              isLogin: true
            },
            children:[
              {
                path:"/invoiceAddress",
                name:"invoiceAddress",
                component:InvoiceAddress,
                meta:{
                  isLogin: true
                },
              },
              {
                path:"/requestInvoice",
                name:"requestInvoice",
                component:RequestInvoice,
                meta:{
                  isLogin: true
                },
              },
              {
                path:"/commitInvoice",
                name:"commitInvoice",
                component:CommitInvoice,
                meta:{
                  isLogin: true
                },
              },
              {
                path:"/invoiceInfo",
                name:"invoiceInfo",
                component:InvoiceInfo,
                meta:{
                  isLogin: true
                },
              },
              {
                path:"/invoiceList",
                name:"invoiceList",
                component:InvoiceList,
                meta:{
                  isLogin: true
                },
              }
            ]
          }
        ]}
    ]
  }
];

const router = new VueRouter({
  routes:routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    }
    return { x: 0, y:0 };
  },
},);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;
axios.defaults.baseURL = "/api";

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");

router.beforeEach((to, from, next) => {
  let getFlag = store.state.loginState.login;
  if (to.meta.isLogin) {
    if (getFlag){
      next()
    }else {
      next({name:'login'})
    }
  }else {
    next();
  }
});
