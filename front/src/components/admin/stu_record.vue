<template>
	<div class="BookRecord">
		<hr></hr>
		<el-row>
			<el-col :span="6">
				 <el-input
				    placeholder="请输入学生名字进行查询"
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
			    :data="records.slice((currentPage-1)*pageSize,currentPage*pageSize)"
			    style="width: 100%;text-align: center;"
			    height="540"
			    border stripe
			    header-cell-style="text-align:center;background-color:#FAFAFA;">
			    <el-table-column
			      prop="Book_name"
			      label="书名" class="bookname">
			    </el-table-column>
			    <el-table-column
			      prop="Student_name"
			      label="学生姓名">
			    </el-table-column>
			    <el-table-column
			      prop="borrow_date"
			      label="借书日期" :formatter="dateFormat">
			    </el-table-column>
			    <el-table-column
			      prop="return_date"
			      label="还书日期" :formatter="dateFormat">
			    </el-table-column>
					<el-table-column label="操作" width="160">
						<template slot-scope="scope">
							<el-button v-model="types" size="small" type="danger" plain
							@click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
			  </el-table>
				<div class="block">
					<el-pagination :total="records.length" :current-page="currentPage" :page-size="pageSize"
					@current-change="handleCurrentChange" layout="total,prev,pager,next,jumper"></el-pagination>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'
import moment from 'moment'
export default {
	name:'stu_records',
	computed: {
		...mapGetters(['records']),
	},
	data() {
		return {
			keywords:'',
			pageSize:8,
      currentPage:1,
		};
	},
	created() {
		this.findAllRecords();
	},
	methods: {
		dateFormat(row,column) {
			var date=row[column.property];
			if(date==undefined){
				return "";
			}
			return moment(date).format("YYYY-MM-DD");
		},
		// 分页
		handleCurrentChange: function(currentPage){
         this.currentPage = currentPage;
    },
		// 模糊查询
		findQuery() {
			var params={keys:this.keywords};
			console.log(params);
			this.findQueryStudent(params);
		},
		// 删除记录
		handleDelete(index,row) {
			 this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
		       confirmButtonText: '确定',
		       cancelButtonText: '取消',
		       type: 'warning'
		   }).then(()=>{
						 let id= [row.Id];
						 console.log('ID='+id);
             this.deleteStudentRecord(id).then((data)=>{
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
		...mapActions(['findAllRecords','findQueryStudent','deleteStudentRecord'])
	}


}
</script>
<style>
.tabletop {
  padding: 20px 0;
}
</style>
