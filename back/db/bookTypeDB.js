var pool=require('./pool');

module.exports = {
    //查找所有书籍类型
    findAll(){
      var sql = "select * from t_type";
      return pool.execute(sql);
    }

}