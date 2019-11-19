<template>
    <el-container direction="vertical" style="padding: 1%">
        <router-view></router-view>
    </el-container>
</template>

<script>
    // import SelectProduct from "./Product/SelectProduct";
    export default {
        name: "ProductPage",
        components:{
            // SelectProduct:SelectProduct
        },
        created(){
        },
        data(){
            return{
                // imgUrl:require('../../assets/img/12.png'),
            }
        }
    }
</script>

<style scoped>

</style>
