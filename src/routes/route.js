const express = require('express');
const userController = require('../controller/controller')
const router = express.Router();
const middleware = require('../middleware/middleware')

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.post('/user', userController.createUser)

router.post('/login', userController.login)

router.get('/user/:userId',middleware.authorise, userController.getUserData)

router.put('/user1/:userId',middleware.authorise , userController.delet)

router.put('/user/:userId' ,middleware.authorise , userController.updatedata)


 









   
  


module.exports = router;