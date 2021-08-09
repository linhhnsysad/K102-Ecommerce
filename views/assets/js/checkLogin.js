// const blacklist=require('./js/blacklist')
const userModel= require("../../../models/usersModel")
const jwt =require('jsonwebtoken')

function checkToken(req,res,next){
        let token= req.cookies.user;
        blacklist.findOne({token:token})
        .then(data=>{
          if(data){
            res.json({mess:'Token ko hợp lệ',status:400,err:false})
          }else{
            next()
          }
        })
        .catch(err=>{
          res.json({mess:'Lỗi server',status:500,err:err})
        })
}

function checkLogin(req,res,next){
        let token= req.cookies.user;
        let id = jwt.verify(token,'projectk10').id;
        userModel.findOne({_id:id})
        .then((data)=>{
          if(data){
            req.role=data.role;
            next();
            
          }else{
            res.json({
              mess:"Chưa đăng nhập",
              status:400
            })
          }
        })
        .catch((err)=>{
          console.log(err)
          res.json({mess:'loi server', status:500});
        })
}
// check quyền 
async function checkQuyen(req,res,next){
  try {
    let token= req.cookies.user;
  let id = jwt.verify(token,'vanh').id;
  let checkID= await userModel.findOne({_id:id})
  // console.log(47, checkID);
  if (checkID.role=='admin'){
    next()
  }else{
    res.json({mess:"ban khong co quyen"})
  }
  } catch (error) {
    res.json({mess:"Loi server"})
  }
}
module.exports= {checkToken,checkLogin,checkQuyen};
