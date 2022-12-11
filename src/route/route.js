
const express = require('express')
const router = express.Router()
const blogController = require("../controller/blogController")
const authorController = require("../controller/authorController")
const middleware = require("../middleware/auth")


//=========================// PHASE -1 //===================================

router.post('/blogs',middleware.Authentication,middleware.authorisation, blogController.createBlog)

router.post('/authors', authorController.createauther)

router.get('/blogs',middleware.Authentication, blogController.getData)

router.put("/blogs/:blogId",middleware.Authentication,middleware.authorisation, blogController.updateBlog)

router.delete('/blog/:blogId',middleware.Authentication,middleware.authorisation, blogController.DELETEdata)

router.delete('/blogs', blogController.deleteByQuery)

router.post('/login', authorController.login) 


//     <===========> error handling route <=================>


router.all("/*",function(req,res){
    return res.status(404).send({status:false,msg:"path is not found"})
})
//===============================================================================//

module.exports = router

