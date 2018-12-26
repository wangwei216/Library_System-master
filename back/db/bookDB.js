var pool=require('./pool');

module.exports = {
    //查找所有书籍信息
    findAll(){
      var sql = "select * from t_book";
      return pool.execute(sql);
    },
    //模糊查询
    query(keys){
      var sql="select * from t_book where Book_name like '%"+keys+"%' or Writer like '%"+keys+"%'";
      return pool.execute(sql);
    },
    //删除多个书籍
    batchDelete(ids){
      var sql = "delete from t_book where Book_num ='"+ids+"'";
      return pool.execute(sql);
    },
    //添加书籍信息
    save(book){
      var sql = "insert into t_book values(null,'"+book.imgPath+"','"
      +book.Book_name+"','"
      +book.Writer+"','"
      +book.Sort_name+"','"
      +book.Price+"','"
      +book.Pub_company+"','"
      +book.Pub_date+"','"
      +book.Total_num+"','"
      +book.Current_num+"','"
      +book.Buy_date+"','"
      +book.Brief+"')";
      console.log(sql);
      return pool.execute(sql);
    },
    //修改书籍信息
    update(book){
      var sql = "update t_book set imgPath= '"+book.imgPath+"', Book_name = '"
      +book.Book_name+"',Writer = '"
      +book.Writer+"',Sort_name = '"
      +book.Sort_name+"',Price='"
      +book.Price+"',Pub_company='"
      +book.Pub_company+"',Pub_date='"
      +book.Pub_date+"',Total_num='"
      +book.Total_num+"',Current_num='"
      +book.Current_num+"',Buy_date='"
      +book.Buy_date+"',Brief='"
      +book.Brief+"' where Book_num ="
      +book.Book_num;
      console.log(sql);
      return pool.execute(sql);
    },
    //修改书籍的当前数量,借书-1
    updatenum(Book_num){
      var sql="update t_book set Current_num=Current_num-1 where Book_num="+Book_num;
      return pool.execute(sql);
    },
    //修改书籍的当前数量,还书+1
    updatenumadd(Book_num){
      var sql="update t_book set Current_num=Current_num+1 where Book_num="+Book_num;
      return pool.execute(sql);
    },
    
} 