const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.put("/putRatingUpdate",bookController.putRatingUpdate)
router.get("/putUpdateData",bookController.putUpdateData)
router.get("/allBookData",bookController.allBookData)
router.post( "/createPublisher", bookController.createPublisher )

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData",authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;