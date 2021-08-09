const  express = require('express');
const path = require('path');
const router = express.Router();
const mongoose = require ("mongoose")
const productModel = require('../models/productModel');
const usersModel = require('../models/usersModel');
const jwt = require("jsonwebtoken");
const {checkLogin} = require('../views/assets/js/checkLogin')
// const axios = require('axios');

router.get('/', (req, res) => {
    res.render("../views/home")
});

router.get('/login', (req, res) => {
    res.render("../views/login")
});
//<<<<<<< anhdv
// router.post('/login',(req,res)=>{
//     usersModel.findOne({username: req.body.username, password: req.body.password})
//     .then((data)=>{
//       if(data){
//           res.render("../views/product_add");  
//           console.log("dang nhap thanh cong")
//       }
//       else{
//         res.render("../views/login");  
//         console.log("dang nhap that bai")
          
//       }
//   }) 
//   .catch((err)=>{
//       res.send(err);
//   })
//   });
// res.render("../views/product_add",{data:token});  
  // login
  router.post('/login',(req,res)=>{
//=======

router.get('/register', (req, res) => {
    res.render("../views/register")
});

router.post('/login',(req,res)=>{
//>>>>>>> main
    usersModel.findOne({username: req.body.username, password: req.body.password})
    .then((data)=>{
      if(data){
        let token=jwt.sign({id:data._id},"projectk10");
        res.json({status:200, data:{token:token, role:data.role}, mess:'ok'})
        console.log("Đăng nhập thành công ");
      }
      else{
        res.json({status:400, mess:'sai user, pass'})
        console.log("Đăng nhập thất bại")
      }
  }) 
  .catch((err)=>{
      res.json({err, status:500, mess:'loi server'});
  })
  });
  
router.post('/checkLogin',checkLogin,(req,res)=>{
  res.json({status: 200 ,mess:'ok', data:req.role})
})

module.exports = router;