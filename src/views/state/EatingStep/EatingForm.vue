<template>
  <a-modal :visible="true" :footer="null" @cancel="handleCancel">
    <div class="content">
      <step1 v-if="currentTab === 0" @nextStep="nextStep" />
      <step2 v-if="currentTab === 1" @finish="finish" @prevStep="prevStep" :firstData="data"/>
    </div>
  </a-modal>
</template>

<script>
import Step1 from "./Step1";
import Step2 from "./Step2";

export default {
  components: {
    Step1,
    Step2
  },
  data() {
    return {
      currentTab: 0,
      // form
      form: null,
      data:{}
    };
  },
  methods: {
    // handler
    nextStep(value) {
      this.currentTab+=1;
      this.data={...value}
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1;
      }
    },
    finish(data) {
      this.currentTab=0
      this.$emit('finish',data);
    },
    handleCancel(){
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
