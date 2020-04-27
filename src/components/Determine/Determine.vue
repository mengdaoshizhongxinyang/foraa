<template>
  <div class="determine-main">
    <div class="content">
      <div class="title"></div>
      <div class="button">
        <div @click="cancel">取消</div>
        <div @click="ok">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Determine",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    ok() {
      this.$emit("ok");
    }
  }
};
</script>

<style lang="less" scoped>
.determine-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fffa;
  .content {
    position: fixed;
    margin: 50% 50%;
    .title{
        padding: 12px;
    }
    .button {
      display: flex;
      div {
        flex: 1;
        height: 2em;
        line-height: 2em;
        text-align: center;
      }
    }
  }
}
</style>