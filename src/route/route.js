const express=require('express')
const router=express.Router()
const bookController=require("../controller/bookcontroller")


router.post("/books",bookController.createbooks)
router.get("/books",bookController.getbooks)


module.exports=router