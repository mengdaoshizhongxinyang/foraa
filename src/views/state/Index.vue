<template>
    <div>
        <Charts></Charts>
        <Eating></Eating>
    </div>
</template>

<script>
import Eating from "./Eating.vue";
import Charts from "./Charts.vue";
    export default {
        components:{
            Eating,
            Charts
        }
    }
</script>

<style lang="less" scoped>

</style>