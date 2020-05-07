<template>
  <div>
    <a-timeline mode="alternate" style="padding:16px;" v-if="plan.length">
      <a-timeline-item v-for="(item, index) in plan" :key="index">
        <p>{{item.do}}</p>
        <p>{{item.start_time}}~{{item.end_time}}</p>
      </a-timeline-item>
    </a-timeline>
    <div v-else>暂无计划</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>