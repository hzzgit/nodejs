<template>
  <div id="demo">
    <test-model v-bind:childname="name" :show.sync="showFlag"></test-model>
    <button @click="tan">显示弹窗</button>

111
  </div>
</template>
<script>
  import testModel from '../components/testModel'
  export default {
    data(){
      return{
        showFlag: false,
        name:'我是传过去的名字'
      }
    },
    components: {
      testModel,
    },
    methods:{
        tan(){
          this.showFlag=true;
        }
    }
  }
</script>

