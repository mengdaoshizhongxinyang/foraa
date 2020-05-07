<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <DatetimePicker
          :show-toolbar="false"
          type="time"
          :min-hour="0"
          :max-hour="24"
          v-model="currentTime"
        ></DatetimePicker>
      </a-form-item>
      <a-form-item label="选择类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group
          name="radioGroup"
          v-decorator="['icon', {initialValue: 'hanbaobao', rules: [{required: true, message: '种类必填'}] }]"
          style="display:flex;flex-wrap: wrap"
        >
          <a-radio value="hanbaobao" style="width:30%">
            <a-icon :component="hanbaobao"></a-icon>肉类
          </a-radio>
          <a-radio value="bingqilin" style="width:30%">
            <a-icon :component="bingqilin"></a-icon>冰淇淋
          </a-radio>
          <a-radio value="kafei" style="width:30%">
            <a-icon :component="kafei"></a-icon>咖啡
          </a-radio>
          <a-radio value="tiantianquan" style="width:30%">
            <a-icon :component="tiantianquan"></a-icon>甜食
          </a-radio>
          <a-radio value="xiangjiao" style="width:30%">
            <a-icon :component="xiangjiao"></a-icon>水果
          </a-radio>
          <a-radio value="regou" style="width:30%">
            <a-icon :component="regou"></a-icon>零食
          </a-radio>
          <a-radio value="shutiao" style="width:30%">
            <a-icon :component="shutiao"></a-icon>油炸食品
          </a-radio>
          <a-radio value="pijiu" style="width:30%">
            <a-icon :component="pijiu"></a-icon>酒
          </a-radio>
          <a-radio value="jiushui" style="width:30%">
            <a-icon :component="jiushui"></a-icon>饮料
          </a-radio>
          <a-radio value="daxia" style="width:30%">
            <a-icon :component="daxia"></a-icon>海鲜
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 15, offset: 9}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
  </div>
</template>

<script>
import {
  hanbaobao,
  bingqilin,
  kafei,
  tiantianquan,
  xiangjiao,
  regou,
  shutiao,
  pijiu,
  jiushui,
  daxia
} from "./icon/index.js";
import moment from "moment";
import { DatetimePicker } from "vant";
import "vant/lib/datetime-picker/style";
export default {
  name: "Step1",
  components: {
    DatetimePicker
  },
  data() {
    return {
      currentTime: moment().format('HH:mm'),
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      hanbaobao,
      bingqilin,
      kafei,
      tiantianquan,
      xiangjiao,
      regou,
      shutiao,
      pijiu,
      jiushui,
      daxia
    };
  },
  methods: {
    nextStep() {
      const {
        form: { validateFields }
      } = this;
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          let data={
            icon:values.icon,
            time:this.currentTime
          }
          console.log(data)
          this.$emit("nextStep",data);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
