const express = require('express');
const router = express.Router();
// const UserController= require("../controllers/userController")
// const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")
const allController= require("../controllers/product,user,order")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
// -------------api create--------------
router.post("/createUser", commonMW.middleware,   allController.createUser)

router.post("/createProduct", commonMW.middleware, allController.createProduct)


router.post("/createOrder", commonMW.middleware, allController.createOrder)















// ------------------closed api ----------
//Can we set the 'next' input parameter in a route handler?
//What is the primary difference between a middleware and a route handler?

// router.post("/createBook", commonMW.myMiddleware,BookController.createBook, function(req, res, next){
//     res.send("Ending the cycle")
// }  )



// router.get("/dummy1", commonMW.myOtherMiddleware, UserController.dummyOne)

// router.get("/dummy2", commonMW.myOtherMiddleware, UserController.dummyTwo)

// router.get("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid4, commonMW.mid3, UserController.basicCode)

module.exports = router;