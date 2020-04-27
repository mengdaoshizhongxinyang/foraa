<template>
  <div>
    <a-collapse>
      <a-collapse-panel v-for="(item,i) in list" :key="i" :header="`${item.time} ${item.remarks}`">
        <p>{{item.content}}</p>
        <div slot="extra">
          <a-icon type="delete" @click="delList(item.id)"/>
          <a-divider type="vertical" />
          <a-icon type="edit" />
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { getEatingList, addEating } from "@/api/home/eating.js";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    getList() {
      getEatingList().then(res => {
        this.list = res.result.data;
      });
    },
    addList() {},
    delList() {},
    updateList() {}
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
</style>