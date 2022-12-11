const mongoose = require('mongoose')
const authorModel = require('../models/authorModel')
const blogModel = require('../models/bolgModel')
const ObjectId = mongoose.Types.ObjectId

const jwt = require("jsonwebtoken")


exports.Authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"]
    if (!token) return res.status(400).send({ status: false, message: "Token is mandatory" })

    jwt.verify(token, "project1group11", (err, decodede) => {
      if (err) { return res.status(401).send({ status: false, message: err.message }) }
      req.id = decodede.userId;
      next()
    })

  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

exports.authorisation = async function (req, res, next) {
  try {
   
    
    // if(!authorid)return res.status(400).send({status :false ,message :"provied a authorid"})
    const id = req.params.blogId
    const authorid = req.body.authorId
    const reqId = req.id
    
    

    if(id){

      if (!ObjectId.isValid(id)) return res.status(400).send({ status: false, message: "Please provide the valid blogid" })

      const data = await blogModel.findOne({ _id: id, isDeleted: false})
      if (!data) return res.status(400).send({ status: false, message: "not found data" })

      const authorid = data.authorId.toString()
      
      if (authorid !== reqId) return res.status(403).send({ status: false, message: "Unauthorized User" })
          next()
    }

    if(authorid){
      if (!ObjectId.isValid(authorid)) return res.status(400).send({ status: false, message: "Please provide the valid authorId" })
      if (authorid !== reqId) return res.status(403).send({ status: false, message: "Unauthorized User" })
          next()
    }



  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}


