<template>
  <div>
    <EatingForm @cancel="handleCancel()" v-if="show" @finish="handleFinish"></EatingForm>
    <a-button type="primary" block style="margin:6px 0" @click="addLisit">添加记录</a-button>
    <a-collapse  @change="handleChange" :accordion="true">
      <a-collapse-panel v-for="(item,i) in list" :key="i" :showArrow="false">
        <template slot="header">
          {{item.time}}
          <span style="position:realtive;">
            <components :is="item.icon" style="width:30px;height:30px;position:absolute;top:8px"></components>
          </span>
          <span style="padding-left:34px;">
            {{item.title}}
          </span>
        </template>
        <p>{{item.content}}</p>
        <div slot="extra">
          <a-icon type="delete" @click="delList(item.id,i)" />
          <a-divider type="vertical" />
        </div>
      </a-collapse-panel>
    </a-collapse>
    <div v-if="!list.length" style="color:#aaa;padding:16px">
      今日没有记录
    </div>
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
} from "./EatingStep/icon/index.js";
import { Toast } from "vant";
import "vant/lib/toast/style";
import { Dialog } from "vant";
import "vant/lib/dialog/style";
import { getEatingList, addEating, delEating } from "@/api/home/eating.js";
import EatingForm from "./EatingStep/EatingForm.vue";
export default {
  components: {
    EatingForm,
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
  },
  data() {
    return {
      list: [],
      show: false,
      key:""
    };
  },
  methods: {
    getList() {
      let id = this.$ls.get("User").id;
      getEatingList(id).then(res => {
        this.list = res.result;
      });
    },
    handleCancel() {
      this.show = false;
    },
    handleFinish(res) {
      this.show=false
      this.list.push(res.result);
    },
    delList(id, index) {
      Dialog.confirm({
        title: "是否删除该记录",
      })
        .then(() => {
          delEating(id)
            .then(res => {
              if (res.errcode == 0) {
                this.key=""
                Toast.success(res.msg);
                this.list.splice(index, 1);
              } else {
                throw res.msg;
              }
            })
            .catch(res => {
              Toast.fail(res);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    handleChange(key){
      this.key=key
    },
    addLisit(){
      this.show=true
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
</style>