const  express = require('express');
const path = require('path');
const router = express.Router();
const mongoose = require ("mongoose")
const productModel = require('../models/productModel');
const usersModel = require('../models/usersModel');

// const jwt = require("jwt")
// const axios = require('axios');

// Render------Trang chu----
router.get('/', (req, res) => {
    res.render("../views/home")
});

// Render------Trang Login ----Login Dang nhap----
router.get('/login', (req, res) => {
    res.render("../views/login")
});
// Render------Trang Dang Ky ----Register----
router.get('/register', (req, res) => {
    res.render("../views/register")
});

//------API---Dang Ky----Register----------
router.post('/register', (req,res) =>{
    try {
        const themuser = new usersModel({
            username: req.body.username,
            password: req.body.password,
        });
        themuser.save();
        res.render("../views/home")
        console.log("dang ky thanh cong")


    } catch (error) {
        res.status(404).send(error.message)
        
    }
});

//------API---Dang nhap----Login----------

router.post('/login',(req,res)=>{
    usersModel.findOne({username: req.body.username, password: req.body.password})
    .then((data)=>{
      if(data){
          res.render("../views/product_add");  
          console.log("dang nhap thanh cong")
      }
      else{
        res.render("../views/login");  
        console.log("dang nhap that bai")
          
      }
  }) 
  .catch((err)=>{
      res.send(err);
  })
  });
  


module.exports = router;