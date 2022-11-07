const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middlware =require("../middleware/auth")

router.post("/create", userController.User)

router.post("/login", userController.loginUser)

// //The userId is sent by front end
router.get("/users/:userId",  middlware.authenticate,  userController.getUserData)

router.put("/users/:userId", middlware.authorise,   userController.updateUser)

router.delete('/users/:userId',   middlware.authorise,     userController.delet)







// router.post("/users/:userId/posts",    middlware.authorise,   userController.postMessage)


module.exports = router