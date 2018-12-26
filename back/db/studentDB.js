var pool=require('./pool');

module.exports = {
    // 管理员查找所有学生信息
    findAll(){
      var sql = "select Student_num,Student_code,Student_name,Academy_name,Class_name,Sex,Email from t_student";
      return pool.execute(sql);
    },
    // 查找学生信息 
    findStudent(name) {
      var sql="select * from t_student where Student_code='"+name+"'";
      console.log(sql);
      return pool.execute(sql);
    },
    // 删除多个学生
    batchDelete(ids){
      var sql="delete from t_student where Student_num in ("+ids.join()+")";
      return pool.execute(sql);
    },
    // 管理员修改学生信息
    update(student){
      var sql="update t_student set Student_code = '"
      +student.Student_code+"',Student_name = '"
      +student.Student_name+"',Academy_name = '"
      +student.Academy_name+"',Class_name='"
      +student.Class_name+"',Sex='"
      +student.Sex+"',Email='"
      +student.Email+"' where Student_num ="
      +student.Student_num;
      console.log(sql);
      return pool.execute(sql);
    },
    // 学生修改信息
    updateInfo(student){
      var sql="update t_student set Student_name = '"
      +student.Student_name+"',Academy_name = '"
      +student.Academy_name+"',Class_name='"
      +student.Class_name+"',Sex='"
      +student.Sex+"',Email='"
      +student.Email+"' where Student_code ='"+student.Student_code+"' ";
      console.log(sql);
      return pool.execute(sql);
    },
    // 模糊查询(学生学号查询)
    query(keys){
      var sql = "select Student_num,Student_code,Student_name,Academy_name,Class_name,Sex,Email from t_student where Student_code like '%"+keys+"%' or Student_name like '%"+keys+"%'";
      return pool.execute(sql);
    },
   
}