const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;
  function isValide(value){
    return (typeof value === "string" &&  value.trim().length > 0 && value.match(/^[A-Za-z ][A-Za-z ]{1,100}$/))
}
function isValideMobil(value){
  return (typeof value === "string" &&  value.trim().length > 0 && value.match(/^[0-9]{1,30}$/))
}
// ======================= api 1========================//

  const  createUser = async (req ,res)=>{
  try{
  let data = req.body
  let { title ,name , phone , email ,address ,password,address:{street,city,picode}} = data

 if(Object.keys(req.body).length == 0)return res.status(400).send({status:false ,massege : "provied all details"})
  //  validation 
  if(!title) return res.status(400).send({status: false , msg : 'provied title'})
  if(!name) return res.status(400).send({status: false , msg : 'provied name'})
  if(!phone) return res.status(400).send({status: false , msg : 'provied phone'})
  if(!email)return res.status(400).send({status: false , msg : 'provied email'})
  if(!address) return res.status(400).send({status: false , msg : 'provied address'})
  if(!password) return res.status(400).send({status: false , msg : 'provied password'})


//  ================regex=====================//

if(!isValide(name))return res.status(400).send({status : false ,massege :"provild vaild name" })
if(!isValideMobil(phone))return res.status(400).send({status : false ,massege :"provild vaild phone" })
if(!email.match(emailValidation))return res.status(400).send({status : false ,massege :"provild vaild email" })
if(!password.match(passwordValidation))return res.status(400).send({status:false,msg:"provild vaild password"})
let titleMatch = ["Mr", "Mrs", "Miss"]
if(!titleMatch.includes(title))return res.status(400).send({status: false , message : "title shoud be like [Mr,Mrs,Miss]"})

// ================ db call ================== //
let emailfind = await userModel.findOne({email:email})
if(emailfind) return res.status(400).send({status: false , massege : "email id already exits"})
let mobilefind = await userModel.findOne({phone:phone})
if(mobilefind )return res.status(400).send({status: false , massege : "mobile number already exits"})

// ======================= //

let createData = await userModel.create(data)
return res.status(201).send({status :true , massege :createData})

}
catch (err){
 return res.status(500).send({status : false ,message : err.message })
}
}




// ==================== LogIN aapi ===============//

 const login = async (req ,res)=>{
  try{
  let data  = req.body
  let { email , password } = data
  
  if(Object.keys(req.body).length == 0)return res.status(400).send({status :flase , message :"provied all details"})


  if(!email)return res.status(400).send({status: false , message : "provied email"})
  if(!password)return res.status(400).send({status: false , message : "provied password"})


  // ================ db call ================== //
let userData = await userModel.findOne({email : email ,password :password})
if(!userData) return res.status(404).send({status: false , message : "provied please vaild  email and password"})

// =============================================//

let tokenCreate = jwt.sign({
   userId :userData._id} 
   ,"this is 3rd project form lithium batch", 
   {expiresIn :'20000'}
   )

return res.status(201).send({status :true , message : 'success' , data : tokenCreate})

}catch (err) {
 return res.status(500).send({status:false , massege :err.message})
}
}

module.exports.createUser=createUser
module.exports.login=login
