
<template>

<div class="table_box">
  <table class="layui-hide" id="test" lay-filter="test"></table>

    <script type="text/html" id="toolbarDemo">
        <div class="static.layui-btn-container">
            <button class="static.layui-btn static.layui-btn-sm" lay-event="addData">新增</button>

        </div>
    </script>
    <script type="text/html" id="barDemo">
        <a class="static.layui-btn static.layui-btn-xs" lay-event="edit">编辑</a>
        <a class="static.layui-btn static.layui-btn-xs" lay-event="view">详情</a>
        <a class="static.layui-btn static.layui-btn-danger static.layui-btn-xs" lay-event="del">删除</a>
    </script>
</div>
</template>

<script>
  var name ="测试"
  export default {
  data () {
    return {
      name:"测试"
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      window.layui.use(['form', 'table'], function () {
        var table = layui.table;
        var form = layui.form;
        table.render({
          elem: '#test'
          , url: devurl+'/vehicle/search'
          , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
          , cols: [[
            {field: 'simNo', title: 'simNo', sort: true}
            , {field: 'plateNo', title: '车牌号'}
            , {field: 'plateNo', title: '车牌号'}
            , {field: 'createDate', title: '创建时间'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 250}
          ]]
          , page: true
        });


        //监听行工具事件
        table.on('tool(test)', function (obj) {
          var data = obj.data;
          //console.log(obj)
          if (obj.event === 'del') {
            window.layer.confirm('真的删除行么', function (index) {
              deleteUser(data.vehicleId);
              window.layer.close(index);
            });
          } else if (obj.event === 'edit') {
            editUser(data.id);
          } else if (obj.event === 'view') {
            view(data.id);
          }
        });

        //头工具栏事件
        table.on('toolbar(test)', function (obj) {
          var checkStatus = table.checkStatus(obj.config.id);
          switch (obj.event) {
            case 'addData':
              addUser();
              break;
          }
          ;
        });
      });

     function deleteUser(veid){
       console.log("读取vue参数"+name)
       $.ajax({
         //请求方式
         type : "get",
         //请求地址
         url : devurl+"/vehicle/delete?vehicleId="+veid,
         //请求成功
         success : function(result) {
           console.log(result);
         },
         //请求失败，包含具体的错误信息
         error : function(e){
           console.log(e.status);
           console.log(e.responseText);
         }
       });
        console.log("删除车辆id"+veid);
      }

    })
  },
    methods:{
      deleteUser(veid){
    console.log("删除车辆id"+veid);
      },
       view(userId) {
         document.location = '/index/index';
    }
  }
  }
</script>
