<template>

  <div>
    车牌号：<input type="text" v-model="plateNo" @keyup="search">
    simNo: <input type="text" v-model="simNo" @keyup="search">

    <table v-if="pagesize>0" border="1">
      <tr>
        <td>序号</td>
        <td>车牌号</td>
        <td>终端卡号</td>
        <td>车辆主键</td>
        <td>删除标志</td>
      </tr>
      <tr v-for="(item,index) in list">
        <td>{{index+1}}</td>
        <td>{{item.plateNo}}</td>
        <td>{{item.simNo}}</td>
        <td>{{item.vehicleId}}</td>
        <td>{{item.deleted}}</td>
      </tr>
    </table>
    <button v-on:click="sendJsonP">查询</button>
    <div v-if="total>0">
      <a @click="beforpage">上一页</a>
      <a v-for="index in pagesize" v-on:click="clickpage(index)" :style="{color: keyword.page==index ?'red':'black' }">
        {{index}} </a>
      <a :title="keyword.page" @click="afterpage">下一页</a>
      总数 {{total}}
    </div>
  </div>
</template>

<script>


  export default {
    name: 'vehiclelist',
    data() {
      return {
        inputValue: "测试",
        keyword: {page: 1, pagesize: 10},
        list: [],
        pagesize: 0,
        total: 0,
        url: '/test/list.action',
        plateNo: '',
        simNo: '',
        times :undefined
      }
    },
    created() {
     this.times=setInterval(this.clock, 1000);
    },
    beforeDestroy() {
      clearInterval(this.times);
    },
    methods: {
      beforpage() {
        if (this.keyword.page > 1) {
          this.keyword.page = this.keyword.page - 1;
          this.sendJsonP();
        }

      },
      afterpage() {
        if (this.keyword.page < this.pagesize) {
          this.keyword.page = this.keyword.page + 1;
          this.sendJsonP();
        }
      },
      clickpage(page) {
        this.keyword.page = page;
        this.sendJsonP();
      },
      search() {
        this.keyword.page = 1;
        this.sendJsonP();
      },
      edit(record) {

        var data = record.rows;
        this.list = data;
        this.pagesize = this.floatToIntegerUp(record.total / 10);
        this.total = record.total;
      },
      sendJsonP() {
        this.keyword.plateNo = this.plateNo;
        this.keyword.simNo = this.simNo;

        this.$axios({
          method: "post",
          url: this.url,
          data:this.keyword,
        }).then((res) => {
          this.edit(res.data)
          console.log(res);
        });


      },

      clock() {
        if (this.pagesize > 0) {
          this.keyword.page = this.keyword.page + 1;
          if (this.keyword.page > this.pagesize) {
            this.keyword.page = 1;
          }
          this.sendJsonP();
        }
      },
      /**
       * 数字，数字（包括正整数、0、浮点数），也可以判断是否金额
       * @param z_check_value 要检查的值
       * @return 符合返回true，否false
       * @author lqy
       * @since 2017-01-07
       */
      isFloat(z_check_value) {
        var z_reg = /^((([0-9])|([1-9][0-9]+))(\.([0-9]+))?)$/;//.是特殊字符，需要转义

        return z_reg.test((z_check_value));
      },
      /**
       * js小数向下取整：浮点数转换成整数，小数点后去掉
       * @param floatNumber
       */
      floatToInteger(floatNumber) {
        if (!this.isFloat(floatNumber)) {
          error("请输入正确的数字");
          return;
        }
        return parseInt(floatNumber);
      },
      /**
       * js 小数向上取整：浮点数转换成整数，如果有小数(1.00不算有小数)，整数加1
       * @param floatNumber
       */
      floatToIntegerUp(floatNumber) {
        var integerNumber = this.floatToInteger(floatNumber);
        if (floatNumber > integerNumber) {
          integerNumber += 1;
        }
        return integerNumber;
      }
    }
  }
</script>


