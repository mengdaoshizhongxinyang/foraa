<template>
  <div class="setting-body">
    <div>
      <div>
        <span style="line-height:34px">计划设置：</span>
        <a-select v-model="date">
          <a-select-option value="0">周日</a-select-option>
          <a-select-option value="1">周一</a-select-option>
          <a-select-option value="2">周二</a-select-option>
          <a-select-option value="3">周三</a-select-option>
          <a-select-option value="4">周四</a-select-option>
          <a-select-option value="5">周五</a-select-option>
          <a-select-option value="6">周六</a-select-option>
        </a-select>
      </div>
      <a-button icon="plus" type="primary" @click="showModal">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">

        </a-form>
      </a-button>
    </div>
    <a-modal v-model="visible"></a-modal>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      date: null,
      visible:false,
      form:null
    };
  },
  created() {
    this.date = moment().format("d");
  },
  methods:{
    showModal(){
      this.visible=true
    }
  }
};
</script>

<style lang="less" scoped>
.setting-body {
  padding: 16px;
  div:first-child {
    display: flex;
    justify-content: space-between;
  }
}
</style>