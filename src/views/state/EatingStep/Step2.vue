<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item label="记录时间" :labelCol="labelCol" :wrapperCol="wrapperCol">{{firstData.time}}</a-form-item>
      <a-form-item label="详细信息记录" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder="简述"
          :rows="4"
          v-decorator="['title']"
        ></a-input>
      </a-form-item>
      <a-form-item label="详细信息记录" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          placeholder="详细记录"
          :rows="4"
          v-decorator="['content', { rules: [{required: true, message: '详细记录必填'}] }]"
        ></a-textarea>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="finish">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import "vant/lib/toast/style";

import { addEating, delEating } from "@/api/home/eating.js";
export default {
  name: "Step2",
  props: {
    firstData: {
      type: Object,
      default: () => {
        return {
          time: null
        };
      }
    }
  },
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0
    };
  },
  methods: {
    finish() {
      const that = this;
      const {
        form: { validateFields }
      } = this;
      that.loading = true;
      validateFields((err, values) => {
        if (!err) {
          let data = Object.assign(values, this.firstData);
          data["user_id"] = this.$ls.get("User").id;
          addEating(data)
            .then(res => {
              if (res.errcode == 0) {
                Toast.success(res.msg);
                this.$emit("finish", res);
                that.loading = false;
              } else {
                throw res.msg;
              }
            })
            .catch(err => {
                this.$emit("finish", res);
              that.loading = false;
              Toast.fail(res)
            });
        } else {
          that.loading = false;
        }
      });
    },
    prevStep() {
      this.$emit("prevStep");
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
</style>
