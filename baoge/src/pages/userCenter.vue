<template>
  <div>
    <p>这是个人中心</p>
    <flowdemo></flowdemo>
    <p>{{name}}</p>
    <router-link to="/userCenter/userInfo">用户信息{{id}}</router-link>
    <router-view></router-view>
  </div>

</template>

<script>
  import flowdemo from '../components/layui/flowdemo'
export default {
  data () {
    return{
      id:0,
      name:''
    }

  },
  components: {
    flowdemo,
  },
  created(){

    this.id = this.$route.query.couponId;
    this.name = this.$route.query.name;

  },
  methods: {

  }
}
</script>

<style scoped>
  p{
    display: block;
    background: #d6e9c6;
  }
</style>
