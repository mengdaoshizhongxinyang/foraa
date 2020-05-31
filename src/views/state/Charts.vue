<template>
  <div>
    <tabs v-model="active">
      <tab title="血糖">
        <Weight></Weight>
      </tab>
      <tab title="血压">
        <BloodPressure></BloodPressure>
      </tab>
      <tab title="血脂">
        <Lipid></Lipid>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { Weight, BloodPressure, Lipid } from "./Chart";
import "vant/lib/tab/style";
import "vant/lib/tabs/style";

export default {
  components: {
    Weight,
    BloodPressure,
    Lipid,
    Tabs,
    Tab
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
</style>