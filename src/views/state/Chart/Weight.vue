<template>
  <div>
    <div class="tab-options">
      <a-button type="primary" @click="add">添加</a-button>
      <a-select style="width: 75px" v-model="show">
        <a-select-option value="table">表格</a-select-option>
        <a-select-option value="chart">图表</a-select-option>
      </a-select>
      <a-select style="width: 90px" v-model="timeSelect">
        <a-select-option value="week">近一周</a-select-option>
        <a-select-option value="month">近一月</a-select-option>
        <a-select-option value="season">近三月</a-select-option>
      </a-select>
    </div>
    <div id="c1" v-show="show!=='table'" style="padding:10px;"></div>
    <a-table bordered :data-source="data" :columns="columns" v-show="show==='table'" rowKey="id">
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm v-if="data.length" title="确定删除？" @confirm="() => onDelete(record.id)">
          <a-button type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <vanDialog
      v-model="visible"
      :show-cancel-button="true"
      title="请输入体重"
      style="padding:8px;text-align:center"
      @confirm="handleConfirm"
    >
      <a-input-number v-model="num" style="margin:8px;" :min="0"></a-input-number>
    </vanDialog>
  </div>
</template>

<script>
import moment from "moment";
import { Dialog } from "vant";
import "vant/lib/dialog/style";
import { Toast } from "vant";
import "vant/lib/toast/style";
import { Chart } from "@antv/g2";
import { getWeight, addWeight, delWeight } from "@/api/home/state";
import DataSet from "@antv/data-set";
export default {
  components: {
    vanDialog: Dialog.Component
  },
  data() {
    return {
      show: "table",
      data: [],
      num: null,
      visible: false,
      timeSelect: "week",
      columns: [
        {
          title: "记录时间",
          dataIndex: "time"
        },
        {
          title: "记录数据",
          dataIndex: "num"
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: 75,
          scopedSlots: { customRender: "operation" }
        }
      ],
      chart: null
    };
  },
  methods: {
    onDelete(key) {
      delWeight(key)
        .then(res => {
          if (res.errcode === 0) {
            this.getList();
            Toast.success({
              message: res.msg
            });
          } else {
            throw res.msg;
          }
        })
        .catch(err => {
          Toast.fail({
            message: err.msg
          });
        });
    },
    getList() {
      let id = this.$ls.get("User").id;
      let end = new moment().format("YYYY-MM-DD HH:mm:ss");
      let start;
      if (this.timeSelect === "week") {
        start = new moment().subtract(7, "days").format("YYYY-MM-DD 00:00:00");
      }
      if (this.timeSelect === "month") {
        start = new moment()
          .subtract(1, "months")
          .format("YYYY-MM-DD 00:00:00");
      }
      if (this.timeSelect === "season") {
        start = new moment()
          .subtract(3, "months")
          .format("YYYY-MM-DD 00:00:00");
      }
      getWeight({ id: id, start: start, end: end })
        .then(res => {
          if (res.errcode == 0) {
            this.data = res.result;
            let temp = [];
            this.data.forEach(item => {
              temp.push({ time: item.time, num: item.num });
            });

            this.chart.changeData(temp);
            this.chart.render();
          } else {
            throw res.msg;
          }
        })
        .catch(err => {
          Toast.fail({
            message: err?err:"网络异常"
          });
        });
    },
    add() {
      this.visible = true;
    },
    handleConfirm() {
      this.visible = false;
      let toast = Toast.loading({
        message: "记录中..."
      });
      if (!this.num) {
        Toast.fail({
          message: "请输入正确数字"
        });
      } else {
        console.log("dss");
        let id = this.$ls.get("User").id;
        addWeight({ user_id: id, num: this.num })
          .then(res => {
            if (res.errcode === 0) {
              this.getList();
              Toast.success({
                message: res.msg
              });
            } else {
              throw res.msg;
            }
          })
          .catch(err => {
            Toast.fail({
              message: err?err:"网络异常"
            });
          });
      }
    },
    handleCancel() {
      this.visible = false;
    }
  },
  mounted() {
    let width = screen.width - 20;
    this.chart = new Chart({
      container: "c1", // 指定图表容器 ID
      width: width, // 指定图表宽度
      height: 300 // 指定图表高度
    });

    this.chart.data(this.data);
    this.chart.scale({
      num: {
        alias: "体重",
        nice: true
      },
      time: {
        range: [0, 1]
      }
    });
    this.chart.tooltip({
      showCrosshairs: true,
      shared: true
    });
    this.chart.axis("time", {
      label: {
        formatter: val => {
            let a=val.split('-')
            let arr=[]
            arr.push(a[1]);
            arr.push(a[2])
            return arr.join('-')
        }
      }
    });
    this.chart.area().position("time*num");
    this.chart.line().position("time*num");
    this.chart.render();
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.tab-options {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
</style>