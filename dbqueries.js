const connect =  require('./connection');

module.exports =
function dbConnect (query,cb){
    connect.getConnection((err,connection)=>{
       connection.query(query,(err,data)=>{
           if(err) cb(err,null);
           cb(null,data);
       })
       if(err) cb(err,null)
       connection.release();
    })
}