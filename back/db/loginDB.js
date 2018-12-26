var pool=require('./pool');

module.exports={
    // 查找用户名
    select_name(name) {
        var sql= 'select * from user where username ="'+name+'" ';
        return pool.execute(sql);
    },
    // 查找用户名对应的密码
    select_password(name) {
        var sql= 'select password from user where username ="'+name+'" ';
        return pool.execute(sql);
    },
    // 修改用户密码
    update_password(name,password) {
        var sql="update user set password = '"+password+"' where username ='"+name+"' ";
        return pool.execute(sql);

    } 
}