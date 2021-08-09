const  express = require('express');
const path = require('path');
const mongoose = require ("mongoose")
const router = express.Router();
const productModel = require('../models/productModel');
// const jwt = require("jwt")
// const axios = require('axios');




router.get('/add', (req, res) => {
    res.render("../views/product_add")
});




router.get('/product', (req, res) => {
    productModel.find()
    .then((data)=>{
        res.render("../views/product",{data})

        console.log(data)
    }) 
    .catch((err)=>{
        res.send(err);
    })

    
});


router.post('/add', (req,res) =>{
    try {
        const themproduct = new productModel({
            idCatagories: req.body.idCatagories,  //select 
            idSubCatagories: req.body.idSubCatagories, //select 
            idDetailCatagories: req.body.idCatagories, //select 
            productName : req.body.productName, // type string
            productCode: req.body.productCode, // type string
            description: req.body.description, // type string
            color: req.body.color,  // type string
            size: req.body.size,    // type string
            price: req.body.price,  // type string
            quality: req.body.quality,  // type string
            sold: req.body.sold,    // type string
            createDate: req.body.createDate, //dd:mm:yyyy
            colorImg: req.body.colorImg, // [{}] array - object
            listImg :req.body.listImg,  // [{}] array - object
            infoImg: req.body.infoImg,  // [{}] array - object
        }); 
        themproduct.save();
        res.render("../views/product_add")
    } catch (error) {
        res.status(404).send(error.message)
        
    }
});






//API tim kiem theo mau sac
router.get("/test", (req,res)=>{
    productModel.find({color: req.query.color})
    .then((data)=>{
        if(data){
            res.json(data)
        }
    }) 
    .catch((err)=>{
        res.send(err);
    })
    
});

//API tim theo  idCatagories
router.get("/phanloai", (req,res)=>{
    productModel.find({idCatagories: req.query.idCatagories})
    .then((data)=>{
        if(data){
            res.json(data)
        }
    }) 
    .catch((err)=>{
        res.send(err);
    })
    
});
//API tim kiem all => trang chu
router.get("/dien-thoai", (req,res)=>{
    productModel.find()
    .then((data)=>{
        if(data){
            res.send(data)
        }
    }) 
    .catch((err)=>{
        res.send(err);
    })
    
});
//Api Tim kiem theo Price
router.get("/price", (req,res)=>{
    productModel.find({price: req.query.price})
    .then((data)=>{
        res.send(data)
    }) 
    .catch((err)=>{
        res.send(err);
    })
    
});

//Api Tim kiem theo idDetailCatagories
router.get("/detail", (req,res)=>{
    productModel.find({idDetailCatagories: req.query.idDetailCatagories})
    .then((data)=>{
        res.send(data)
    }) 
    .catch((err)=>{
        res.send(err);
    })
    
});






module.exports = router;