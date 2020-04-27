<template>
  <base-view state="user" :title="$route.meta.title">
    <div class="user">
      <router-view></router-view>
    </div>
  </base-view>
</template>

<script>
import { BaseView } from "@/layouts";
export default {
  components: {
    BaseView
  },
  methods: {},
  mounted(){
    console.log(this.$route) 
  }
};
</script>

<style lang="less" scoped>
.user {
  width: 100%;
}
</style>