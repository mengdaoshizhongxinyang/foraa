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
          <p>{{item.do}}</p>
          <p>{{item.start_time}}~{{item.end_time}}</p>
      </a-timeline-item>
    </a-timeline>
    <div v-else>
        暂无计划
    </div>
  </div>
</template>

<script>
import { getImgs,getTimeList } from "@/api/home/index.js";
export default {
  data() {
    return {
      imgs: [],
      plan:[]
    };
  },
  methods: {
    getCarousels() {
      getImgs().then(res => {
        this.imgs = res.result.data;
      });
    },
    handleLink(options, to) {
      console.log(1);
      console.log(options, to);
    },
    getTimePlan(){
        getTimeList().then(res=>{
            this.plan = res.result.data;
        })
    }
  },
  mounted() {
    this.getCarousels();
    this.getTimePlan();
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