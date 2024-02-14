const express =   require("express");
const connect =   require('./connection');
const dbConnect = require('./dbqueries');

const app = express();


connect.getConnection((err,data)=>{
    if(err)throw err;
    console.log('connected to db')
})

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/getusers',(req,res)=>{ 
    let query = 'select * from user';
    dbConnect(query,(err,data)=>{
          if(err) throw err
          res.send(data);
    });
});

app.post('/adduser',(req,res)=>{
    let query = 'insert into user(name) values ("'+req.body.user+'")';
    dbConnect(query,(err,data)=>{
         if(err) throw err;
         res.send(data);
    });
});

app.put('/updateuser',(req,res)=>{
     let query = 'update user set name="'+req.body.user+'" where id="'+req.body.id+'"'
     dbConnect(query,(err,data)=>{
        if(err)throw err;
        res.send(data);
     });
  
});

app.delete('/removeuser',(req,res)=>{
   let query = 'delete from user where id="'+req.body.id+'"'
   dbConnect(query,(err,data)=>{
        if(err) throw err;
        res.send(data);
   });
});

app.get('/:id',(req,res)=>{
    res.status(200).json({"sdsd":req.params.id,"rtrt":req.query.data})
})

let port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`server run at ${port}`));