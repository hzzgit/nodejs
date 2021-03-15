<template>
  <div id="echartstest">
    <div id="main" style="width: 600px;height:400px;"></div>

    <button @click="review">修改</button>
    <button @click="reload">刷新</button>

  </div>
</template>

<script>
  export default {
    name: "echartstest",
    data(){
      return {
        // 指定图表的配置项和数据
        option: {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          legend: {
            data: ["销量"]
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        },
        myChart:1
      }
    },
    methods: {
      drawChart() {
        this.myChart= this.$echarts.init(document.getElementById("main"))
// 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(this.option);
      },
      //尝试进行重新绘画
      review(){
        this.option.xAxis.data=["替换", "替换2", "替换3", "替换4", "高跟鞋", "袜子"]
        this.drawChart();
      },
      //刷新页面
      reload(){
        this.$router.replace(
          {
            path:'echartstestreplace'
          }
        )
      }
    },
    mounted() {
      this.drawChart();
    }
  };
</script>
