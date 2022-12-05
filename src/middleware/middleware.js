const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const booksModel = require('../models/booksModel')
const userModel = require('../models/userModel')




exports.authentication = async (req, res, next) => {
  try {
    let headersValue = req.headers['x-api-key']
    if (!headersValue) return res.status(400).send({ status: false, message: "provied  token value" })

    jwt.verify(headersValue, "this is 3rd project form lithium batch", (err, decoeded) => {
         if (err) return res.status(401).send({ status: false, message: err.message })
          req.id = decoeded.userId
            next() 
    }
    )

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}




exports.authorization = async (req, res, next) => {
  try {
    const bookid = req.params.bookId
    const id = req.id
    const userid = req.body.userId
   
    if (bookid) {
      if (!mongoose.Types.ObjectId.isValid(bookid))
        return res.status(400).send({ status: false, msg: "please enter valide bookId" })
      
      const bookdata = await booksModel.findOne({ _id: bookid, isDeleted: false });
      if (!bookdata)return res.status(404).send({ status: false, message: "book id is not found" });
      
      if (id !== bookdata.userId.toString()) return res.status(403).send({ status: false, message: "unathraization" })
      next()
    }


     else{
      if(!userid)return res.status(400).send({status: false ,msg :"provied user id"})
      if (!mongoose.Types.ObjectId.isValid(userid))
        return res.status(400).send({ status: false, msg: "please enter valide userid" })

      if (id !== userid) return res.status(403).send({ status: false, message: "unathraization user id not vaild" })
      next()
    }

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}