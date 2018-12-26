<template>
  <div class="BookSelects">
      <el-row style="margin-top:-10px;">
          <hr></hr>
        <el-col :span="6">
            <el-input v-model="keywords" @change="findQuery"
             placeholder="请输入书名或作者查询"
             prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="18">
            <el-button class="addbook" type="primary" icon="el-icon-edit-outline" plain @click="handleSingleSave">图书录入</el-button>
        </el-col>
      </el-row>
      <el-row class="tabletop" style="text-align: center;">
        <el-col>
            <el-table :data="books.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%; text-align: center;"
               height="600" stripe border header-cell-style="text-align:center;background-color:#FAFAFA;">
              <el-table-column prop="imgPath" label="封面" width="106">
                  <template slot-scope="scope">
                      <img :src="scope.row.imgPath" alt="" style="width: 90px;height: 104px">
                  </template>
              </el-table-column>
              <el-table-column label="书名" class="bookname" prop="Book_name" ></el-table-column>
              <el-table-column label="作者"  prop="Writer"></el-table-column>
              <el-table-column label="类型"  prop="Sort_name"></el-table-column>
              <el-table-column label="出版社" width="120" prop="Pub_company" ></el-table-column>
              <el-table-column label="出版日期" width="80" :formatter="dateFormat" prop="Pub_date"></el-table-column>
              <el-table-column label="价格" width="60" prop="Price"></el-table-column>
              <el-table-column label="总数" width="60" prop="Total_num"></el-table-column>
              <el-table-column label="现存" width="60" prop="Current_num"></el-table-column>
              <el-table-column label="购进日期" width="80"  :formatter="dateFormat" prop="Buy_date"></el-table-column>
              <el-table-column label="简介"  prop="Brief" width="140"></el-table-column>
              <el-table-column label="操作" width="124">
                  <!--作用域插槽-->
                  <template slot-scope="scope">
                      <el-button type="primary" plain icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                      <el-button type="danger" plain icon="el-icon-delete" circle  @click="handleDelete(scope.$index, scope.row)"></el-button>
                  </template>
              </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination :total="books.length" :current-page="currentPage" :page-size="pageSize"
                 @current-change="handleCurrentChange" 
                 layout="total,prev,pager,next,jumper"></el-pagination>
            </div>
        </el-col>
      </el-row>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" center width="40%">
          <el-form :model="form">
            <el-form-item label="封面" class="row">
                <el-upload
                  class="upload-demo" name="fulAvatar"
                  action="http://localhost:3000/book/uploadImg"
                  :before-upload="beforeAvatarUpload"
                  :on-success="uploadsuccess"
                  :limit="1"
                  :list-type="picture">
                  <el-button size="small" plain="" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="书名" class="row">
                <el-input v-model="form.Book_name" style="width:400px;" placeholder=""></el-input>
            </el-form-item>
             <el-form-item label="作者" class="row">
                <el-input v-model="form.Writer" style="width:400px;" placeholder=""></el-input>
            </el-form-item>
             <el-form-item label="类型" class="row">
                <el-select v-model="form.Sort_name" style="width:400px;" placeholder="请选择">
                    <el-option v-for="item in types"
                     :key="item.Sort_id"
                     :label="item.Sort_name"
                     :value="item.Sort_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出版社" class="pubcompany">
                <el-input v-model="form.Pub_company" style="width:400px;" placeholder=""></el-input>
            </el-form-item>
             <el-form-item label="出版日期">
               <el-date-picker v-model="form.Pub_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:400px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="价格" class="row">
                <el-input v-model="form.Price" style="width:400px;" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="总数" class="row">
                <el-input v-model="form.Total_num" style="width:400px;" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="现存" class="row">
                <el-input v-model="form.Current_num" style="width:400px;" placeholder=""></el-input>
            </el-form-item>
             <el-form-item label="购进日期">
               <el-date-picker v-model="form.Buy_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:400px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="描述" class="row">
                <el-input v-model="form.Brief" style="width:400px;" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible=false">取消</el-button>
              <el-button type="primary" @click="handleSubmit">确定</el-button>
          </div>
      </el-dialog>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'
import moment from 'moment'
export default {
    name:'BookSearch',
    computed: {
        ...mapGetters(['books','types'])       
    },
     data() {
          return{
				keywords:'',
				dialogFormVisible:false,
				form:{},
                title:'',
                pageSize:4,
                currentPage:1,
                picture:''
			}
     },
    created () {
         this.findAllBook();
         this.findAllTypes();
     },
     methods: {
         //日期显示问题
         dateFormat(row,column) {
             var date = row[column.property];
             if (date == undefined) {
                 return "";
             }
             return moment (date).format("YYYY-MM");
         },
         handleCurrentChange: function(currentPage){
             this.currentPage = currentPage;
         },
         // 上传之前的钩子函数
         beforeAvatarUpload(file) {
             console.log(file.type)
             const isJPG = file.type === 'image/jpeg'||'image/png';
             const isLt2M = file.size / 500 / 500 < 1;
             console.log(file.size)
             if (!isJPG) {
                 this.$message({
                     type:'false',
                     message:'只支持jpg/png格式'
                 }); 
             }
             if (!isLt2M) {
                 this.$message({
                     type:'false',
                     message:'图片大小不能超过1024KB!'
                 }); 
             }
             return isJPG ;
         },
         // 上传成功
         uploadsuccess(fulAvatar){
             console.log('上传成功');
             this.findAllBook();
         },
         //模糊查询
         findQuery(){
             var params = {keys:this.keywords};
             console.log(params);
             this.findQueryBook(params);
         },
         //删除书籍
         handleDelete(index,row){
             this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
		       confirmButtonText: '确定',
		       cancelButtonText: '取消',
		       type: 'warning'
		 }).then(()=>{
             let ids= [row.Book_num];
             this.batchDeleteBook(ids).then((data)=>{
                 this.$message({
                     type:'success',
                     message:'删除成功!'
                 });
             }).catch((error)=>{
                 this.$message({
                     type:'false',
                     message:'删除失败!'
                 }); 
             });
         }).catch(()=>{
              this.$message({
                     type:'info',
                     message:'已取消操作'
                 });
         });
         },
         // 修改书籍
         handleEdit(index,row){
             this.form=row;
             console.log(this.form);
             this.title="修改书籍信息";
             this.dialogFormVisible=true;
         },
         // 书籍录入
         handleSingleSave(){
             this.dialogFormVisible=true;
             this.title='录入书籍信息';
             this.form={};
         },
         // 用promise知道保存图书成功还是失败
         handleSubmit(){
             this.dialogFormVisible=false;
             var vm=this;
             if(this.title=="录入书籍信息"){
                 console.log(this.form);
                 this.saveBook(this.form).then(function(data){
                     vm.$message({
                         type: 'success',
                         message: '添加成功!'
                     });
                 }).catch(function(error){
                     vm.$message({
                         type: 'error',
                         message: '添加失败!'
                     });
                 });
             }else{
                 console.log(this.form);
                 this.updateBook(this.form).then(function (data){
                     vm.$message({
                         type: 'success',
                         message: '修改成功!'
                     });
                   }).catch(function (error) {
                       vm.$message({
                           type: 'error',
                           message: '修改失败!'
                       });
                     });
             }
         },
         ...mapActions(['findAllBook','findQueryBook','batchDeleteBook','updateBook','saveBook','findAllTypes'])
     }
     

} 
</script>
<style type="text/css" scoped>
.tabletop {
    padding: 10px 0;
}
.row {
    margin-left: 28px;
}
.pubcompany {
    margin-left: 15px;
}
.addbook {
    float: right;
}

</style>

