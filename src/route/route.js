const { application } = require('express')
const express=require('express')
const router=express.Router()
const bookController=require("../controller/bookcontroller")
const userController=require("../controller/usercontroller")


router.post("/register",userController.createUser)
router.post("/login",userController.login)
router.post("/books",bookController.createbooks)
router.get("/books",bookController.getbooks)
router.get("/books/:bookId",bookController.getBybookid)


router.all('/*',function(req,res){
    return res.status(400).send({status:false, message:"pls provide valid path"})
})

module.exports=router