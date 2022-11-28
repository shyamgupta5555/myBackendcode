const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


  const regex = /^[a-zA-Z ]{1,30}$/
  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const mobileValidation = /^([+]\d{2})?\d{10}$/
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;



  const  createUser = async function(req ,res){
  try{
  let data = req.body
  let { titel ,name , phone , email ,address ,password} = data

 if(!Object.keys(res.body).length == 0)return res.staus(400).send({status:false ,massege : "provied all details"})
  //  validation 
  if(!titel) res.status(400).send({status: false , msg : 'provied title'})
  if(!name) res.status(400).send({status: false , msg : 'provied name'})
  if(!phone) res.status(400).send({status: false , msg : 'provied phone'})
  if(!email) res.status(400).send({status: false , msg : 'provied email'})
  if(!address) res.status(400).send({status: false , msg : 'provied address'})
  if(!password) res.status(400).send({status: false , msg : 'provied password'})


//  ================regex=====================//

if(!name.match(regex))return res.status(400).send({status : false ,massege :"provild vaild name" })
if(!phone.match(mobileValidation))return res.status(400).send({status : false ,massege :"provild vaild phone" })
if(!email.match(emailValidation))return res.status(400).send({status : false ,massege :"provild vaild email" })
if(!password.match(passwordValidation))return res.status(400).send({status:false,msg:"provild vaild password"})


// ================ db call ================== //
let emailfind = await userModel.findOne({email:email})
if(emailfind) return res.status(400).send({status: false , massege : "email id already exits"})
let mobilefind = await userModel.findOne({phone:phone})
if(!mobilefind )return res.status(400).send({status: false , massege : "mobile number id already exits"})

// ======================= //

let createData = await userModel.create(data)
res.status(201).send({status : flase , massege :createData})

}
catch (err){
  res.status(500).send({status : false ,msg : err.massege })
}
}




// ==================== LogIN aapi ===============//

 const login = async function(req ,res){
  try{
  let data  = res.body
  let { email , password } = data
  
  if(!Object.keys(res.body).length == 0)return res.staus(400).send({status :flase , massege :"provied all details"})


  if(!email)return res.status(400).send({status: false , massege : "provied email"})
  if(!password)return res.status(400).send({status: false , massege : "provied password"})


  // ================ db call ================== //
let userData = await userModel.findOne({email : email ,password :password})
if(!userData) return res.status(404).send({status: false , massege : "provied please vaild  email and password"})

// =============================================//

let tokenCreate = jwt.sign({
   userId :userData._Id,
   project :"poject-3" } 
   ,"this is 3rd project form lithium batch", {expiresIn :12000}
   )

res.status(201).send({status :true , massege : 'success' , data : tokenCreate})

}catch (err) {
  res.status(500).send({status:false , massege :err.massege})
}
}

module.exports.createUser=createUser
module.exports.login=login
