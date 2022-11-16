const jwt  = require("jsonwebtoken")
const BlogModel = require("../models/bolgModel")

const Authentication = async function(req,res, next)
{
   try{
 let token = req.headers["x-api-key"]
 if(!token) return res.status(400).send({status: false, message: "Token is mandatory"})

 let decodedToken = jwt.verify(token,"project1group11") 
   if (!decodedToken){
       return res.status(401).send({status : false, message: "token is invalid "})
   }
  req.id= decodedToken.userId;
   next()
 }
   catch(error){
      return res.status(500).send({status: false , message: error.message})
   }
}
module.exports.Authentication = Authentication;