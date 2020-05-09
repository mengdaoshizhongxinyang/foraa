<template>
  <div class="gan-image">
    <div class="over">{{message()}}</div>
    <img
      :src="src"
      alt
      :style="imgStyle"
      @load.prevent="inImageResolve"
      @error.prevent="onImageReject"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    imgStyle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      state: "pending"
    };
  },
  methods: {
    inImageResolve() {
      this.state = "resolve";
      this.$emit("resolve", this.state);
    },
    onImageReject() {
      this.state = "reject";
      this.$emit("reject", this.state);
    },
    message() {
      const { state } = this;
      let message = "加载中";
      switch (state) {
        case "pending":
          message = "加载中";
          break;
        case "reject":
          message = "加载失败";
          break;
        case "resolve":
          message = "加载失败";
          break;
      }
      return message;
    }
  }
};
</script>

<style lang="less" scoped>
.gan-image {
  position: relative;
  .over {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>