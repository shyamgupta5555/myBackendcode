const { response } = require("express")

const middleware1 = function(req ,res , next){
  console.log("hii middleware")
  const isLogin =  true 
  if(! isLogin){
    return response.send("not match login ")
  }
  next()
}

const miid2 = function(req ,res, next){
  console.log("this ismid 2")
  next()
}
const miid3 = function(req ,res, next){
  console.log("this ismid 3")
next()
}
const miid4 = function(req ,res, next){
  console.log("this ismid 4")
  next()
}






const  isValidRequestBody =function(res,res ,next){
  if(! req.body || Object.keys(req.body).length<0){
    return res.send("body is required")
  }
  next()
}
module.exports.middleware1=middleware1
module.exports.miid2 =miid2
module.exports.miid3 =miid3
module.exports.miid4 =miid4