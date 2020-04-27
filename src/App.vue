<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "app",
    data() {
      return {
        locale: zh_CN
      };
    },
  components: {
    
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: fixed;
}
body {
  overflow: hidden;
}
</style>
