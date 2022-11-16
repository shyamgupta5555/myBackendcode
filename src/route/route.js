
const express = require('express')
const router = express.Router()
const blogController = require("../controller/blogController")
const authorController = require("../controller/authorController")
const AuthenticationMid = require("../middleware/authentication")
const authorisation = require('../middleware/authorisation')

//==============// PHASE -1 //===================================

router.post('/blogs', blogController.createBlog)

router.post('/authors', authorController.createauther)

router.get('/blogs',AuthenticationMid.Authentication, blogController.getData)

router.put("/blogs/:blogId",AuthenticationMid.Authentication,authorisation.authorisation, blogController.updateBlog)

router.delete('/blogs/:blogId',AuthenticationMid.Authentication,authorisation.authorisation, blogController.DELETEdata)

router.delete('/blogs',AuthenticationMid.Authentication,authorisation.authorisation, blogController.deleteunpublished)

router.post('/login', authorController.login)
//===============================================================================//

module.exports = router

