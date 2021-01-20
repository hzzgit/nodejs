<template>
  <div v-if="show" style="position: absolute;margin-left:34%;width: 300px;height:200px;background-color: #ffe87c ">
    <button @click="closeShow">关闭</button>
    {{childname}}
  </div>
</template>
<script>

  export default {
    data(){
      return{
      }
    },
    props: ['show','childname'],
    methods: {
      closeShow() {
        this.$emit("update:show",false);
      }
    },
  }
</script>

