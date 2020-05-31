<template>
  <div>
    <div class="tab-options">
      <a-button type="primary" @click="add">添加</a-button>
      <a-select style="width: 75px" v-model="show">
        <a-select-option value="table">表格</a-select-option>
        <a-select-option value="chart">图表</a-select-option>
      </a-select>
      <a-select style="width: 90px" v-model="timeSelect" @change="handleChange()">
        <a-select-option value="week">近一周</a-select-option>
        <a-select-option value="month">近一月</a-select-option>
        <a-select-option value="season">近三月</a-select-option>
      </a-select>
    </div>
    <div id="c2" v-show="show!=='table'" style="padding:10px;"></div>
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
      title="请输入血压"
      style="padding:8px;text-align:center"
      @confirm="handleConfirm"
    >
      <a-input-number v-model="num" style="margin:8px;" :min="0"></a-input-number>~
      <a-input-number v-model="num_max" style="margin:8px;" :min="0"></a-input-number>
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
import {
  getBloodPressure,
  addBloodPressure,
  delBloodPressure
} from "@/api/home/state";
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
      num_max: null,
      visible: false,
      timeSelect: "week",
      columns: [
        {
          title: "记录时间",
          dataIndex: "time"
        },
        {
          title: "舒张压",
          dataIndex: "num"
        },
        {
          title: "收缩压",
          dataIndex: "num_max"
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
      delBloodPressure(key)
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
          toast.clear().fail({
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
      getBloodPressure({ id: id, start: start, end: end })
        .then(res => {
          if (res.errcode == 0) {
            this.data = res.result;
            let temp = [];
            this.data.forEach(item => {
              temp.push({
                time: item.time,
                num: item.num,
                num_max: item.num_max
              });
              // temp.push({ time: item.time, num: item.num_max,type:'收缩压' });
            });

            this.chart.changeData(temp);
          } else {
            throw res.msg;
          }
        })
        .catch(err => {
          toast.clear().fail({
            message: err ? err : "网络异常"
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
        addBloodPressure({ user_id: id, num: this.num, num_max: this.num_max })
          .then(res => {
            if (res.errcode === 0) {
              this.data.push({
                ...res.result,
                time: new moment().format("YYYY-MM-DD HH:mm:ss")
              });
              let temp = [];
              this.data.forEach(item => {
                temp.push({
                  time: item.time,
                  num: item.num,
                  num_max: item.num_max
                });
              });
              this.chart.changeData(temp);
              Toast.success({
                message: res.msg
              });
            } else {
              throw res.msg;
            }
          })
          .catch(err => {
            toast.clear().fail({
              message: err ? err : "网络异常"
            });
          });
      }
    },
    handleCancel() {
      this.visible = false;
    },
    handleChange() {
      this.getList();
    }
  },
  mounted() {
    let width = screen.width - 20;
    this.chart = new Chart({
      container: "c2", // 指定图表容器 ID
      width: width, // 指定图表宽度
      height: 300, // 指定图表高度
      padding: [10, 10, 45, 30]
    });

    this.chart.scale({
      num: {
        max: 150
      }
    });

    this.chart
      .line()
      .position("time*num")
      .shape("smooth");
    this.chart
      .line()
      .position("time*num_max")
      .shape("smooth");
    this.chart.guide().regionFilter({
      top: true,
      start: ["min", 120],
      end: ["max", 80],

      color: "orange",
      apply: ["line"]
    });
    this.chart.guide().regionFilter({
      top: true,
      start: ["min", 999],
      end: ["max", 120],

      color: "#f27548",
      apply: ["line"]
    });
    this.chart.guide().line({
      start: ["min", 80],
      end: ["max", 80],
      lineStyle: {
        stroke: "orange",
        lineWidth: 2
      },
      text: {
        position: "start",
        style: {
          fill: "#8c8c8c",
          fontSize: 15,
          fontWeight: "normal"
        },
        content: "舒张压危险线",
        offsetY: -5
      }
    });
    this.chart.guide().line({
      start: ["min", 120],
      end: ["max", 120],
      lineStyle: {
        stroke: "#f27548",
        lineWidth: 2
      },
      text: {
        position: "start",
        style: {
          fill: "#8c8c8c",
          fontSize: 15,
          fontWeight: "normal"
        },
        content: "收缩压危险线",
        offsetY: -5
      }
    });
    this.chart.render();
    this.getList();
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