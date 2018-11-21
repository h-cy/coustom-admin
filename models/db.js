const mysql = require('mysql');
const cfg = {
    host:'localhost',
    user:'kaikeba_admin',
    password:'root',
    database:'kaikeba'
}

// 连接池
const pool = mysql.createPool(cfg);

module.exports ={
    query:function(sql,value){
        return new Promise((resolve,reject)=>{
            pool.query(sql,value,(err,results)=>{
                if(err) reject(err);
                else resolve(results);
            })
        })
    }
}