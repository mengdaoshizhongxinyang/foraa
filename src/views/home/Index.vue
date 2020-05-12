<template>
  <div style="padding:16px 16px 0">
    <a-carousel :adaptiveHeight="true">
      <a v-for="(img, index) in imgs" :key="index">
        <img :src="img.url" alt style="width:100%" @click="handleLink(img.type,img.to)" />
      </a>
    </a-carousel>
    <a-divider>
        <div>plan</div>
    </a-divider>
    <a-timeline mode="alternate" style="padding:16px;" v-if="plan.length">
      <a-timeline-item v-for="(item, index) in plan" :key="index">
          <p>{{item.title}}</p>
          <p>{{item.start}}~{{item.end}}</p>
          <p>{{item.content}}</p>
      </a-timeline-item>
    </a-timeline>
    <div v-else>
        暂无计划
    </div>
  </div>
</template>

<script>
import { getImgs } from "@/api/home/index.js";
import { getPlan } from "@/api/show/plan.js";
import moment from "moment";
export default {
  data() {
    return {
      imgs: [],
      plan:[],
      date:""
    };
  },
  methods: {
    getCarousels() {
      getImgs().then(res => {
        this.imgs = res.result;
      });
    },
    handleLink(options, to) {
      
    },
    getList() {
      getPlan(this.$ls.get("User").id).then(res => {
        this.plan = res.result.filter(item => {
          return item.date === 7 || item.date ==this.date 
        });
      });
    },
  },
  mounted() {
    this.date=new moment().format('d');
    this.getCarousels();
    this.getList();
  }
};
</script>

<style lang="less" scoped>
/deep/.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  background: #364d79;
  overflow: hidden;
}
</style>