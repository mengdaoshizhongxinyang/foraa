<template>
  <div class="setting-body">
    <div>
      <div>
        <span style="line-height:34px">计划设置：</span>
        <a-select v-model="date" @change="handleChange">
          <a-select-option value="0">周日</a-select-option>
          <a-select-option value="1">周一</a-select-option>
          <a-select-option value="2">周二</a-select-option>
          <a-select-option value="3">周三</a-select-option>
          <a-select-option value="4">周四</a-select-option>
          <a-select-option value="5">周五</a-select-option>
          <a-select-option value="6">周六</a-select-option>
        </a-select>
      </div>
      <a-button icon="plus" type="primary" @click="showModal"></a-button>
    </div>
    <a-modal v-model="visible" :footer="null">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="计划标题">
          <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入计划标题' }] }]" />
        </a-form-item>
        <a-form-item label="时间">
          <a-select
            v-decorator="[
              'date',
              {initialValue: date, rules: [{ required: true, message: '请输入日期' }] },
            ]"
          >
            <a-select-option value="0">周日</a-select-option>
            <a-select-option value="1">周一</a-select-option>
            <a-select-option value="2">周二</a-select-option>
            <a-select-option value="3">周三</a-select-option>
            <a-select-option value="4">周四</a-select-option>
            <a-select-option value="5">周五</a-select-option>
            <a-select-option value="6">周六</a-select-option>
            <a-select-option value="7">每天</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="执行时间">
          <a-time-picker
            placeholder="开始时间"
            v-decorator="['start', {rules: [{ type: 'object', required: true, message: '请输入详细时间!' }]}]"
          />~
          <a-time-picker
            placeholder="结束时间"
            v-decorator="['end', {rules: [{ type: 'object', required: true, message: '请输入详细时间!' }]}]"
          />
        </a-form-item>
        <a-form-item label="计划详细">
          <a-textarea v-decorator="['content']" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 9 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-timeline style="padding:16px;" v-if="filterList.length">
      <a-timeline-item v-for="(item, index) in filterList" :key="index">
        <p style="display:flex;justify-content: space-between;">
          {{item.title}}
          <a-button type="danger" shape="circle" icon="close" @click="del(item.id)"></a-button>
        </p>
        <p>{{item.start}}~{{item.end}}</p>
        <p>{{item.content}}</p>
      </a-timeline-item>
    </a-timeline>
    <div v-else>暂无计划</div>
  </div>
</template>

<script>
import moment from "moment";
import { Plan } from "@/components/Plan";
import { getPlan, addPlan, delPlan, updatePlan } from "@/api/show/plan.js";
import { mapState, mapActions } from "vuex";
import { Toast } from "vant";
import "vant/lib/toast/style";
export default {

  data() {
    return {
      date: null,
      visible: false,
      form: null,
      list: [],
      // filterList: []
    };
  },
  created() {
    this.date = moment().format("d");
    this.form = this.$form.createForm(this, { name: "coordinated" });
  },
  components: {
    Plan
  },
  computed: mapState({
    filterList: state => {
      let arr = state.plan.plan
        .filter(item => {
          return item.date === 7 || item.date == new moment().format("d");
        })
        .sort((a, b) => {
          if(a.start > b.start){
            return 1
          }else{
             return -1
          }
        });
      return arr;
    }
  }),
  methods: {
    handleChange(v) {
      this.filterList = this.list.filter(item => {
          return item.date === 7 || item.date == this.date;
        });
    },
    showModal() {
      this.visible = true;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = { ...values };
          console.log(data.start);
          data.start = data.start.format('HH:mm:ss');
          data.end = data.end.format('HH:mm:ss');
          data["user_id"] = this.$ls.get("User").id;
          addPlan(data)
            .then(res => {
              if (res.errcode === 0) {
                console.log(res)
                this.$store.dispatch('addPlan',res.result)

                Toast.success(res.msg);
              } else {
                throw res.msg;
              }
            })
            .catch(res => {
              Toast.fail(res);
            });
        }
      });
      this.visible=false
    },
    getList() {
      getPlan(this.$ls.get("User").id).then(res => {
        this.list = res.result;
        this.filterList = this.list.filter(item => {
          console.log(item.date,this.date)
          return item.date === 7 || item.date == this.date;
        });
      });
    },
    del(id) {
      delPlan(id)
        .then(res => {
          if (res.errcode === 0) {
            this.$store.dispatch('delPlan',id)
            Toast.success(res.msg);
          } else {
            throw res.msg;
          }
        })
        .catch(res => {
          Toast.fail(res);
        });
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