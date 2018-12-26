<template>
    <div class="StudentInfo">
      <hr></hr>
        <el-row>
            <el-col :span="6">
                 <el-input
                    placeholder="请输入学生学号或姓名进行查询"
                    prefix-icon="el-icon-search"
                    v-model="keywords" @change="findQuery">
                </el-input>
            </el-col>
            <el-col :span="18">
            </el-col>
        </el-row>
        <el-row class="tabletop" style="text-align: center;">
            <el-col>
                <el-table
                :data="students.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                style="width: 100%;text-align: center;"
                height="510"
                border stripe
                header-cell-style="text-align:center;background-color:#FAFAFA;">
                <el-table-column
                  prop="Academy_name"
                  label="专业">
                </el-table-column>
                <el-table-column
                  prop="Student_name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="Total_num"
                  label="借阅总数">
                </el-table-column>
                <el-table-column
                  prop="Total_num"
                  label="名次">
                </el-table-column>

                <el-table-column label="操作" width="184">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      plain icon="el-icon-delete"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block">
                <el-pagination :total="students.length" :current-page="currentPage" :page-size="pageSize"
                 @current-change="handleCurrentChange"
                 layout="total,prev,pager,next,jumper"></el-pagination>
            </div>
            </el-col>
        </el-row>
         <el-dialog :title="title" :visible.sync="dialogFormVisible" center width="40%">
          <el-form :model="form">
            <el-form-item label="专业" class="row">
              <el-input v-model="form.Academy_name1" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="姓名" class="row">
              <el-input v-model="form.Student_name" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="借书总数" class="row">
              <el-input v-model="form.Total_num" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="名次" class="row">
              <el-input v-model="form.Total_num" style="width:400px;"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
          </div>
        </el-dialog>
        </div>
</template>
<script>
  import {mapState,mapGetters,mapActions} from 'vuex'
  export default {
          name:'top',
          computed: {
            ...mapGetters(['students'])
          },
          data() {
            return {
              keywords:'',
              pageSize:8,
              currentPage:1,
              dialogFormVisible:false,
              dialogFormVisiblesave:false,
              form:{},
              formsave:{},
              title:'',
              titlesave:''
            }
          },
          created() {
            this.findTop();
            console.log(this.form);
          },
          methods: {
          // 分页
          handleCurrentChange: function(currentPage){
             this.currentPage = currentPage;
          },
          // 查询排行榜
          findTop() {
            this.findTop(this.form);
            console.log(this.form);
          },
          // 删除按钮
          handleDelete(index,row) {
            this.$confirm('此操作将永久删除该条记录，是否继续?','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              let ids=[row.Student_num];
              this.batchDeleteStudent(ids).then((data)=>{
                this.$message({
                  type:'success',
                  message:'删除成功!'
                });
              }).catch((error)=> {
                this.$message({
                  type:'false',
                  message:'删除失败!'
                });
              });
            }).catch(()=>{
              this.$message({
                type:'false',
                message:'已取消操作'
              });
            });
          },
          // 确定按钮
          handleSubmit() {
            this.dialogFormVisible=false;
            var vm=this;
            if(this.title=="修改学生信息"){
              this.updateStudent(this.form).then(function(data){
                vm.$message({
                  type:'success',
                  message:'修改成功'
                });
              }).catch(function(error){
                vm.$message({
                  type:'error',
                  message:'修改失败!'
                });
              });
            }
          },
          ...mapActions(['findTop','saveStudent','updateStudent','batchDeleteStudent','findQueryStudent'])

          }

        }
</script>
<style>
.tabletop {
  padding: 20px 0;
 }
.row {
  margin-left: 18px;
}
</style>
