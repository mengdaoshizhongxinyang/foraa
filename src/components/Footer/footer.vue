<template>
  <div class="footer-main">
    <div class="footer-tab" v-for="(item, index) in list" :key="index" @click="goTo(item.name)">
      <div class="icon-item"  >
        <a-icon :type="item.icon" v-if="state===item.name" style="color:#189fff"></a-icon>
        <a-icon :type="item.icon" v-else></a-icon>
      </div>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Footer",
  data() {
    return {
      list: [
        { title: "每日", icon: "pie-chart" ,name:"daily"},
        { title: "个人状况", icon: "solution" ,name:"state"},
        { title: "用户", icon: "user" ,name:"user"}
      ],
      state:"user"
    };
  },
  methods: {
    goTo(name) {
      if(name!==this.state){
        this.state=name
        this.$router.push({name:name})
      }
      
    }
  }
};
</script>

<style lang="less" scoped>
.footer-main {
  display: flex;
  .footer-tab {
    flex: 1;
    text-align: center;
    .icon-item{
        font-size: 28px;
    }
  }
}
</style>