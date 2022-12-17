const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { db } = require('./model/DbConnection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// read
app.get('/api/readData', (req,res)=>{
  const sqlQuery = "SELECT * FROM user";
  db.query(sqlQuery,(err,result)=>{
    if(err){
      console.log("read Error");
    }else{
      res.send(result);
      console.log(result);
    }
  })
});


// readUser
app.get('/api/readUser/:field/:contain', (req,res)=>{

  let field = req.params.field;
  if(field == "nama"){
    field = "user_name";
  }else if(field == "email"){
    field = "user_email"
  }else if(field == "password"){
    field = "user_password"
  }

  const contain = req.params.contain;

  const sqlQuery = "SELECT * FROM user WHERE "+field+" =?";
  db.query(sqlQuery,contain,(err,result)=>{
    if(err){
      console.log("read user error");
    }else{
      res.send(result);
      console.log(result);
    }
  });
});


// Create Data
app.post('/api/createUser',(req,res)=>{
  const userName = req.body.user_name;
  const userEmail = req.body.user_email;
  const userPassword = req.body.user_password;

  const sqlQuery="INSERT INTO user (user_name, user_email, user_password) VALUE (?, ?, ?)";
  db.query(sqlQuery,[userName,userEmail,userPassword],(err,result)=>{
    if(err){
      console.log("createUser Error");
    }else{
      res.send(result);
      console.log(result);
    }
  });
});


// Update Data
app.put('/api/updateUser',(req,res)=>{
  const userId = req.body.user_id;
  const userName = req.body.user_name;
  const userEmail = req.body.user_email;
  const userPassword = req.body.user_password;

  const sqlQuery = "UPDATE user SET user_name = ?, user_email = ?, user_password = ? WHERE user_id = ?";
  db.query(sqlQuery,[userName,userEmail,userPassword,userId],(err,result)=>{
    if(err){
      console.log("updateUser Error");
    }else{
      res.send(result);
      console.log(result);
    }
  });
});


// delete data
app.delete('/api/deleteUser',(req,res)=>{
  const userId = req.body.user_id;

  const sqlQuery = "DELETE FROM user WHERE user_id = ?";
  db.query(sqlQuery,userId,(err,result)=>{
    if(err){
      console.log("DeleteUser Error");
    }else{
      res.send(result);
      console.log(result);
    }
  });
});


app.listen(3001, ()=>{
  console.log("Berhasil");
});

