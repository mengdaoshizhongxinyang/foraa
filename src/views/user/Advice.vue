<template>
  <div class="advice-main">
    <a-textarea placeholder="感谢您的建议" :rows="4" v-model="content" />
    <a-button type="primary" style="margin-top:8px" block @click="submit">提交</a-button>
  </div>
</template>

<script>
import { addAdvice } from "@/api/advice";

import { Toast } from 'vant';
import 'vant/lib/toast/style';

export default {

  data() {
    return {
      content: "",
      visiable: false
    };
  },
  methods: {
    submit() {
      addAdvice({
        content:this.content
      }).then(res=>{
        if(res.errcode===0){
          Toast.success(res.msg)
          this.$router.push({name:'user'})
        }else{
          throw "网络异常"
        }
      }).catch(res=>{
        Toast.fail(res)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.advice-main {
  padding: 12px;
}
</style>