<template>
  <div>
    <div class="header"></div>
    <div
      v-for="(item,index) in list"
      :key="index"
      class="list-item"
      @click="goTo(item.url)"
    >{{ item.title }}</div>
    <div class="list-item" @click="logout">退出</div>
  </div>
</template>

<script>
import { BaseView } from "@/layouts";
import { Dialog } from "vant";

import "vant/lib/dialog/style";
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
  methods: {
    goTo(url) {
      this.$router.push({ path: url });
    },
    logout() {
      Dialog.confirm({
        title: "登出",
        message: "确认退出？？"
      })
        .then(() => {
          this.$ls.clear();
          this.$router.push({ name: "login" });
          this.$message.success('登出成功');
        })
        .catch(() => {
          // on cancel
        });
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