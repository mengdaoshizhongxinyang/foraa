<template>
  <div class="main">
    <div class="header">
      <div class="left">
        <a-icon type="left" v-if="$route.meta.back" @click="back()"></a-icon>
      </div>
      <div class="content">{{$route.meta.title}}</div>
      <div class="right"></div>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="footer">
      <Footer :state="$route.meta.icon"></Footer>
    </div>
  </div>
</template>

<script>
import { Footer } from "@/components/Footer";
export default {
  components: {
    Footer
  },
  props: {
    state: {
      type: String,
      default: "message"
    }
  },
  methods:{
    back(){
      window.history.back(-1); 
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
  padding: 64px 0;
  top: 0px;
  overflow-x: hidden;
}
.header {
  position: fixed;
  height: 64px;
  width: 100%;
  top: 0px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  background-color: #1fc8db;
  background-image: linear-gradient(
    141deg,
    #9fb8ad 0%,
    #1fc8db 51%,
    #2cb5e8 75%
  );
  z-index: 1;
  display: flex;
  .left {
    width: 40px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    padding-top:10px;
    padding-left: 10px;
  }
  .content {
    color: #fff;
    font-size: 20px;
    flex: 1;
    text-align: center;
    padding-top: 12px;
  }
  .right {
    width: 40px;
  }
}
.body{
  height:100%;
  overflow-x: hidden;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0px;
  height: 64px;
  box-shadow: 0px -2px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background: #fff;
}
</style>