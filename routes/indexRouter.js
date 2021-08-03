const  express = require('express');
const path = require('path');
const router = express.Router();
const mongoose = require ("mongoose")
const productModel = require('../models/productModel');
const usersModel = require('../models/usersModel');

// const jwt = require("jwt")
// const axios = require('axios');

router.get('/', (req, res) => {
    res.render("../views/home")
});

router.get('/login', (req, res) => {
    res.render("../views/login")
});

router.get('/register', (req, res) => {
    res.render("../views/register")
});

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