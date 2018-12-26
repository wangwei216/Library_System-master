<template>
  <div class="BookSelects">
      <el-row style="margin-top:-10px;">
        <el-col :span="6">
            <el-input v-model="keywords" @change="findQuery"
             placeholder="请输入书名或作者查询"
             prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="18">          
        </el-col>
      </el-row>
      <el-row class="tabletop" style="text-align: center;">
        <el-col>
            <el-table :data="books.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%; text-align: center;"
               height="600" header-cell-style="text-align:center;background-color:#FAFAFA;">
              <el-table-column prop="imgPath" label="封面" width="106">
                  <template slot-scope="scope">
                      <img :src="scope.row.imgPath" alt="" style="width: 100px;height: 103px">
                  </template>
              </el-table-column>
              <el-table-column label="书名" class="bookname" prop="Book_name"></el-table-column>
              <el-table-column label="作者"  prop="Writer"></el-table-column>
              <el-table-column label="类型"  prop="Sort_name"></el-table-column>
              <el-table-column label="出版社"  prop="Pub_company" ></el-table-column>
              <el-table-column label="出版日期" width="80" :formatter="dateFormat" prop="Pub_date"></el-table-column>
              <el-table-column label="价格" width="60" prop="Price"></el-table-column>
              <el-table-column label="总数" width="60" prop="Total_num"></el-table-column>
              <el-table-column label="现存" width="60" prop="Current_num"></el-table-column>
              <el-table-column label="购进日期" width="80"  :formatter="dateFormat" prop="Buy_date"></el-table-column>
              <el-table-column label="简介"  prop="Brief" width="160"></el-table-column>
            </el-table>
            <div class="block">
                <el-pagination :total="books.length" :current-page="currentPage" :page-size="pageSize"
                 @current-change="handleCurrentChange" 
                 layout="total,prev,pager,next,jumper"></el-pagination>
            </div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'
import moment from 'moment'
export default {
    name:'BookSearch',
    computed: {
        ...mapGetters(['books'])       
    },
     data() {
          return{ 
				keywords:'',
                pageSize:4,
                currentPage:1,
			}
     },
    created () {
         this.findAllBook();
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
         //模糊查询
         findQuery(){
             var params = {keys:this.keywords};
             console.log(params);
             this.findQueryBook(params);

         },

        
         ...mapActions(['findAllBook','findQueryBook'])
     }
     

}
</script>
<style scoped>
.tabletop {
    padding: 20px 0 40px 0;
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

