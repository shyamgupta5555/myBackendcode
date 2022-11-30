const { application } = require('express')
const express=require('express')
const router=express.Router()
const bookController=require("../controller/bookcontroller")
const userController=require("../controller/usercontroller")
const reviwesController = require("../controller/reviewscontroller")
const middleware = require("../middleware/middleware")


// ===============user api================//

router.post("/register",userController.createUser)
router.post("/login",userController.login)
// ============ book api =====================//
router.post("/books",middleware.authentication,middleware.authorization,bookController.createbooks)
router.get("/books",middleware.authentication,bookController.getbooks)
router.get("/books/:bookId",middleware.authentication,bookController.getBybookid)
router.put("/books/:bookId",middleware.authentication,middleware.authorization,bookController.updatebook)
router.delete("/books/:bookId",middleware.authentication,middleware.authorization,bookController.deleteBookById)

// =================== review=====================//
router.post("/books/:bookId/review",reviwesController.createReview)
router.put("/books/:bookId/review/:reviewId" ,reviwesController.updateReview)
router.delete("/books/:bookId/review/:reviewId" ,reviwesController.deleterive)

router.all('/*',function(req,res){
    return res.status(400).send({status:false, message:"pls provide valid path"})
})

module.exports=router