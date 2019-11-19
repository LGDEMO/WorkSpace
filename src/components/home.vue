<template>
    <router-view></router-view>
</template>

<script>
    export default {
        created(){
            this.$router.push("/index")
        },
        name: "home",
    }
</script>

<style scoped>

</style>
