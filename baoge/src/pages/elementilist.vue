
<template>
  <div>
    <el-form :inline="true"  ref="searchform">
      <el-form-item label="车牌号:"  >
        <el-input v-model="keyword.plateNo" placeholder="请输入内容"></el-input>
      </el-form-item>
    <el-button type="primary" v-on:click="sendJsonP()">立即搜索</el-button>
    <el-button  @click="resetForm()">重置搜索</el-button>
    <el-button type="primary" v-on:click="handleAdd()">新增</el-button>
    </el-form>
    <el-table
      :data="tableData.filter(data => !search || data.plateNo.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%" border>
      <el-table-column
        label="创建时间"
        prop="createDate">
      </el-table-column>
      <el-table-column
        label="车牌号"
        prop="plateNo">
      </el-table-column>
      <el-table-column
        label="终端卡号"
        prop="simNo" sortable>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-show="searchtotal>0">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchtotal">
    </el-pagination>
  </div>

    <el-dialog :title="dialogtitle" label-position="left" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form" :rules="rules" ref="form">
        <el-form-item label="车牌号"  prop="plateNo">
          <el-input v-model="form.plateNo" ></el-input>
        </el-form-item>
        <el-form-item label="终端卡号" >
          <el-input v-model="form.simNo" ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" >
          <el-date-picker type="date" placeholder="选择日期" v-model="form.createDate" ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savedate('form')">确 定</el-button>

      </div>
    </el-dialog>

  </div>
</template>


<script>
  export default {
    methods: {
      handleSizeChange(val) {
        this.currentPage=1;
        console.log(`每页 ${val} 条`);
        this.keyword.pagesize=val;
        this.sendJsonP();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.keyword.page=val;
        this.sendJsonP();
      },
      handleAdd() {
        this.dialogFormVisible=true;
        this.dialogtitle='新增';
        this.form={
          plateNo: '',
          simNo: '',
          createDate: ''
        }
      },
      handleEdit(index, row) {
        this.dialogFormVisible=true;
        this.dialogtitle='修改';
        console.log(index, row);
        var obj={};
        obj=JSON.parse(JSON.stringify(row)); //this.templateData是父组件传递的对象,如果不这么做会出现对象相同，同时改变的情况
        this.form.plateNo=obj.plateNo;
        this.form.simNo=obj.simNo;
        this.form.createDate=obj.createDate;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        console.log(index, row);
      },
      savedate(formName){
        console.log(this.form);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$notify({
              title: '提示',
              type: 'success',
              message: '保存成功',
              duration: 5000
            });
            this.dialogFormVisible = false;
          } else {
            this.$notify({
              title: '提示',
              type: 'error',
              message: '内容未填写',
              duration: 5000
            });
            return false;
          }
        });

      },
      sendJsonP() {
        console.log(this.keyword)
        this.$axios({
          method: "post",
          url: this.url,
          data:this.keyword,
        }).then((res) => {
          console.log(res);
          var data=res.data;
          this.tableData=res.data.rows;
          this.searchtotal=data.total;
        });
      },
      resetForm() {
      this.keyword={page: 1, pagesize: 10,plateNo:''};
        this.currentPage=1;
        this.sendJsonP();
      }
    },


    data() {
      return {
        url: '/test/list.action',
        keyword: {page: 1, pagesize: 10,plateNo:''},
        searchtotal:0,
        tableData:[],
        search:'',
        dialogFormVisible:false,
        dialogtitle:"新增",
        currentPage:1,
        form: {
          plateNo: '',
          simNo: '',
          createDate: ''
        },
        rules: {
          plateNo: [
            { required: true, message: '请输入车牌号', trigger: 'blur' }
          ]
        }
      };
    }
  }
</script>
