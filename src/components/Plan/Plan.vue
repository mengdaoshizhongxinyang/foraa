<template>
  <div>
    <a-timeline mode="alternate" style="padding:16px;" v-if="plans.length">
      <a-timeline-item v-for="(item, index) in plans" :key="index">
        <p>{{item.title}}</p>
        <p>{{item.start}}~{{item.end}}</p>
        <p>{{item.content}}</p>
      </a-timeline-item>
    </a-timeline>
    <div v-else>暂无计划</div>
  </div>
</template>

<script>
export default {
  props:{
    plans:{
      type:Array,
      default:()=>{
        return []
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>