
const userModel = require('../model/user')

const jwt = require('jsonwebtoken')


// const authenticate = function(req ,res, next){
//   let headers = req.headers['freeappuser']
//   console.log(headers)
//   if(!headers)  return res.status(400).send({msg:"this is not set header value"})
//   if(headers == "false") return res.status(400).send({msg:"this is user not freeappuser"})

//   if(headers == "true") next()
  
// }
 

const authorise = async function(req, res, next){
try{
  let token = req.headers["x-auth-token"]
  if(!token) return res.status(404).send("this is not set  header value ")

  let a = jwt.verify(token , "this is shyam")

  if(!a) return res.status(404).send("this is not correct token")
  console.log(a)
  let id = a.userId
  let b =  await userModel.findById({_id :id})
  console.log(b)
  if(!b) return res.status(404).send({msg :" this userid is worng "})

  console.log("middleware succesful")
  next()
}catch(error){
  console.log("this is error : " ,error.message )
  res.status(500).send({msg : error.message , status: true})
}
}





// module.exports.authenticate= authenticate
module.exports.authorise=authorise
