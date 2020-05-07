<template>
    <div>
      <div class="header"></div>
      <div v-for="(item,index) in list" :key="index" class="list-item" @click="goTo(item.url)">{{ item.title }}</div>
      <div class="list-item">退出</div>
    </div>
</template>

<script>
import { BaseView } from "@/layouts";
export default {
  components: {
    BaseView
  },
  data() {
    return {
      list: [
        { title: "个人信息", url: "/user/info" },
        { title: "计划设置", url: "/user/setting" },
        { title: "建议反馈", url: "/user/advice" }
      ]
    };
  },
  methods:{
      goTo(url){
        this.$router.push({ path: url })
      }
  }
};
</script>

<style lang="less" scoped>

  .list-item {
    padding: 12px 24px;
    border-bottom: 1px solid #e6e6e6;
  }
  .logout {
    margin-top: 12px;
    border-top: 1px solid #e6e6e6;
  }

</style>