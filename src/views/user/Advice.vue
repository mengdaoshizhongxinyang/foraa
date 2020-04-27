<template>
  <div class="advice-main">
    <a-textarea placeholder="感谢您的建议" :rows="4" v-model="content" />
    <a-button type="primary" style="margin-top:8px" block @click="submit">提交</a-button>
    <Determine title="感谢您提出的宝贵意见" v-if="visiable" @ok="handleOk" @cancel="handleCancel"></Determine>
  </div>
</template>

<script>
import { Determine } from "@/components/Determine";
export default {
  components: {
    Determine
  },
  data() {
    return {
      content: "",
      visiable: false
    };
  },
  methods: {
    submit() {
      this.visiable = true;
    },
    handleOk() {},
    handleCancel() {
      this.visiable = false;
    }
  }
};
</script>

<style lang="less" scoped>
.advice-main {
  padding: 12px;
}
</style>