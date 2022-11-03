const UserModel= require("../models/userModel")
const ProductModel= require("../models/productModel")
const OrderModel= require("../models/orderModel")
// const userModel = require("../models/userModel")

const createProduct = async function(req ,res){
  let product = req.body

  let createProduct = await  ProductModel.create(product)
  res.send({msg : createProduct})
}

const createUser =  async function(req ,res){
  let user = req.body
  // let headers = req.headers
  // console.log(headers)
  let createUser = await  UserModel.create(user)
  res.send({msg : createUser})

}



const createOrder = async function(req ,res){
  let objectData = req.body
    let  userid = objectData.user_Id
    let checkuserid = await UserModel.findById({_id : userid})
    if(!checkuserid) return res.send({ msg : "this is invaild user id "})

  let productid = objectData.product_Id
  let checkproductid = await ProductModel.findById({_id : productid})
  if(!checkproductid) return res.send({ msg : "this vaild productid"})

 let  price = checkproductid.price
//  let data  =  req.body

objectData.isFreeAppUser = req.headers["isfreeappuser"] 
//  console.log(isFreeAppUser)

 if(objectData.isFreeAppUser == "true"){
  objectData.amount = 0
  let savedData = await OrderModel.create(objectData)
  return res.send({msg : savedData})
 }
 let blance1 = checkuserid.balance
 if(price >blance1){ 
  return res.send({msg : "insuffcient blance"})
}

let user1 = await userModel.findByIdAndUpdate(
  {_id: userid },
  {$inc : {balance : -price}},
{new : true }
)

objectData.amount = price
  let createOrder = await  OrderModel.create(objectData)
  res.send({msg : createOrder ,user1})

}




module.exports.createOrder =createOrder
module.exports.createProduct =createProduct
module.exports.createUser=createUser


