
const express = require('express')
const router = express.Router()
const blogController = require("../controller/blogController")
const authorController = require("../controller/authorController")
const AuthenticationMid = require("../middleware/authentication")

//==============// PHASE -1 //===================================

router.post('/blogs', blogController.createBlog)

router.post('/authors', authorController.createauther)

router.get('/blogs',AuthenticationMid.Authentication, blogController.getData)

router.put("/blogs/:blogId", blogController.updateBlog)

router.delete('/blogs/:blogId', blogController.DELETEdata)

router.delete('/blogs', blogController.deleteunpublished)

router.post('/login', authorController.login)
//===============================================================================//

module.exports = router

