<template>
<div>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ path: '/library/slider' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的图书馆</el-breadcrumb-item>
      <el-breadcrumb-item>我的借阅</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-remove-outline"></i>&nbsp;书籍归还</span>
            <div class="BookRecord">
                <el-row class="tabletop" style="text-align:center;">
                  <el-col>
                      <el-table :data="records" style="width:100%;text-align:center;"
                      height="440" header-cell-style="text-align:center;background-color:#f0f9eb;">
                        <el-table-column prop="Book_name" label="书名" class="bookname"></el-table-column>
                        <el-table-column prop="Student_name" label="学生名称"></el-table-column>
                        <el-table-column prop="borrow_date" label="借书日期" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column prop="return_date" label="应还书日期" :formatter="dateFormat"></el-table-column>
                        <el-table-column label="操作" width="160">
                          <template slot-scope="scope">
						                <el-button v-model="types" round type="success" plain icon="el-icon-time"
						                @click="handleReturn(scope.$index, scope.row)" size="small">还书</el-button>
						              </template>
                        </el-table-column>
                      </el-table>
                  </el-col>
                </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane name="second" type="border-card">
                <span slot="label"><i class="el-icon-circle-plus"></i>&nbsp;书籍借阅</span>
                <el-row>
                  <el-col :span="6" class="search">
                      <el-input v-model="keywords"
                       placeholder="请输入书名进行查询"
                       prefix-icon="el-icon-search"
                       @change="findQuery"></el-input>
                  </el-col>
                  <el-col :span="18"></el-col>
                </el-row>
                <el-row class="tabletop" style="text-align:center;">
                  <el-col>
                      <el-table :data="books.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width:100%;text-align:center;"
                      height="600"  header-cell-style="text-align:center;background-color:oldlace;color:grey">
                        <el-table-column prop="imgPath" label="封面">
                          <template slot-scope="scope">
                             <img :src="scope.row.imgPath" alt="" style="width: 100px;height: 105px">
                          </template>
                        </el-table-column>
                        <el-table-column label="书名" prop="Book_name"></el-table-column>
                        <el-table-column label="作者" prop="Writer"></el-table-column>
                        <el-table-column label="出版社" prop="Pub_company"></el-table-column>
                        <el-table-column label="出版日期" :formatter="dateFormat1" prop="Pub_date"></el-table-column>
                        <el-table-column label="书籍总数"  prop="Total_num"></el-table-column>
                        <el-table-column label="当前数量"  prop="Current_num"></el-table-column>
                        <el-table-column label="书籍描述"  prop="Brief"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
						                  <el-button type="warning" icon="el-icon-tickets" plain round @click="handleEdit(scope.$index, scope.row)">借书</el-button>	
						               </template>
                        </el-table-column>
                      </el-table>
                      <div class="block">
                        <el-pagination :total="books.length" :current-page="currentPage" :page-size="pageSize"
                        @current-change="handleCurrentChange" layout="total,prev,pager,next,jumper"></el-pagination>
                      </div>
                  </el-col>
                </el-row>
                <el-dialog :title="title" :visible.sync="dialogFormVisible" center width="40%">
                  <el-form :model="form">
                   <el-form-item label="书的编号">
                     <el-input v-model="form.Book_num" readonly style="width:400px;" class="row"></el-input>
                   </el-form-item>
                   <el-form-item label="学生学号">
                     <el-input v-model="form.Student_code" readonly style="width:400px;" class="row"></el-input>
                   </el-form-item>
					         <el-form-item label="借书日期" >
					          <el-date-picker
					            v-model="form.borrow_date" readonly type="date" value-format="yyyy-MM-dd" style="width:400px;" class="row">
					          </el-date-picker>
					         </el-form-item>
					         <el-form-item label="应还书日期">
					          <el-date-picker
    						     v-model="form.return_date" readonly type="date" value-format="yyyy-MM-dd" style="width:400px;">
					          </el-date-picker>
					         </el-form-item>
					        </el-form>
					        <div slot="footer" class="dialog-footer">
					          <el-button @click="dialogFormVisible = false">取 消</el-button>
					          <el-button type="primary" @click="handleSubmit">确 定</el-button>
					        </div>
					       </el-dialog>
      </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'
import moment from 'moment'

export default {
  name:'BookRecords',
  computed: {
    ...mapGetters(['records','books'])
  },
  data() {
    return {
      form: {
        Student_code: sessionStorage.getItem('username'),
        borrow_date:new Date(),
        return_date:new Date(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate(),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds())
      },
      activeName:'first',
      keywords:'',
      keywordsreturn:'',
      dialogFormVisiblereturn:false,
      dialogFormVisible:false,
      formreturn:{},
      title:'',
      types:'',
      pageSize:4,
      currentPage:1,
    };
  },
  created() {
    var params = {username:sessionStorage.getItem('username')};
    console.log(params);
    this.findStudentRecord(params);
    this.findAllBook();
  },
  methods: {
        dateFormat(row,column) {
         var date = row[column.property];
         if (date == undefined) {
          return "";
        }
         return moment (date).format("YYYY-MM-DD");
        },
        dateFormat1(row,column) {
         var date = row[column.property];
         if (date == undefined) {
          return "";
        }
         return moment (date).format("YYYY-MM");
        },
        
        handleCurrentChange: function(currentPage){
         this.currentPage = currentPage;
        },
        // 模糊查询
        findQuery(){
        var params = {keys:this.keywords};
        console.log(params);
		    this.findQueryBook(params);
		    },
        // 借书
        handleEdit(index,row){
          this.title="增加借书信息";
          this.form.Book_num=row.Book_num;
          this.dialogFormVisible=true;
        },
        handleSubmit(){
          this.dialogFormVisible=false;
          var vm=this;
          if(this.title=="增加借书信息"){
            this.saveborrowbook1(this.form).then(function(data){
              console.log("借书",data);
              vm.$message({
                type:'success',
                message:'借书成功!'
              });
            }).catch(function(error){
              console.log("借书失败",error);
               vm.$message({
                type:'success',
                message:'借书成功!'
              });
            });
            let id=this.form.Book_num;
            console.log("id",id);
            this.updateBookNum(id).then(function(data){
              console.log("减",data);              
            }).catch(function(error){
              console.log("借书数量修改失败",error);
            });
          }
        },
        // 还书
        handleReturn(index,row){
          this.$confirm('校队信息后确定还书?','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=> {
              let name=sessionStorage.getItem('username');
              let id=[row.Book_num]; 
              console.log('学号'+name,'编号'+id);
              this.$http.post('http://localhost:3000/bookstudent/returnbook',{id:id,name:name}).then((data)=>{
                this.$message({ 
                  type:'success',
                  message:'还书成功!'
                });
                this.updateBookNumadd(id).then(function(data){
                  console.log("加",data);              
                }).catch(function(error){
                  console.log("还书数量修改失败",error);
                  });
                  var params = {username:sessionStorage.getItem('username')};
                  console.log(params);
	        		    this.findStudentRecord(params);               
                }).catch((error)=> {
                  this.$message({
                    type:'error',
                    message:'还书失败!'
                  });
                });
                })
            },
        handleClick(tab, event) {
	        	if(this.activeName=="first"){
              var params = {username:sessionStorage.getItem('username')};
              console.log(params);
	        		this.findStudentRecord(params);
	        	}else if(this.activeName=="second"){
	        		this.findAllBook();
	        	}else{

	        	}},
        ...mapActions(['findAllBook','findQueryBook','findQueryBook1','findStudentRecord',
        'findQueryStudent','saveborrowbook1','updateBookNum','returnBook','updateBookNumadd']),
  }
  
   
 
}
</script>  
<style scoped>
.tabletop {
  padding: 10px 0 20px 0; 
}

.row {
    margin-left: 10px;
}
.search {
  margin: 4px 0;
}
.breadcrumb {
  margin-bottom: 20px;
  margin-top: -14px;
}
</style>

