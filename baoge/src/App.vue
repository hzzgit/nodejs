<template>
  <div id="app" >
<!--    <img src="./assets/logo.png">-->
    <p style="background-color: #92B8B1">这可以看做是导航栏</p>
    <div style="text-align: left;background-color: #92B8B1;height:50px" >
    <div class="title">
      <router-link   to="/index">首页</router-link>
    </div>
    <div class="title">
      <router-link  to="/userCenter">个人中心</router-link>
    </div>
      <div class="title">
        <router-link  to="/tangchuan">弹窗测试</router-link>
      </div>
      <div class="title">
        <router-link  to="/vehiclelist">车辆列表</router-link>
      </div>
      <div class="title">
        <router-link  to="/layuilist">车辆列表layui</router-link>
      </div>
      <div class="title">
        <router-link  to="/elementilist">车辆列表elementui</router-link>
      </div>

      <div class="title">
        <router-link  :to="{name:'userCenter',query:{couponId: record.id,name:'车'}}">个人中心1</router-link>
      </div>
    </div>
<!--    <div>-->
<!--      <el-button @click="startHacking">Start</el-button>-->
<!--    </div>-->

    <router-view></router-view>
  </div>


</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      record:{id:1}
    }
  },
  methods: {
    startHacking () {
      this.$notify({
        title: '大佬伟',
        type: 'success',
        message: '死麻花啊死麻花啊',
        duration: 5000
      });
      // this.$notify({
      //   title: '大佬少',
      //   type: 'error',
      //   message: '死麻花啊死麻花啊',
      //   duration: 5000
      // })
    }
  }

}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .title{
    width: 19%;
    display:inline-block;
  }
</style>
