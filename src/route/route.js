
const express = require('express')
const router = express.Router()
const blogController = require("../controller/blogController")
const authorController = require("../controller/authorController")

router.post('/createBlog',blogController.createBlog)

router.post('/createAuthor',authorController.createauther)

module.exports = router

