const express = require('express');
const lodash = require('lodash')
const underscore = require('underscore')
const router = express.Router();///test-you
//importing a custom module
const xyz = require('../logger')


const x = require('../logger/logger.js')

const y = require('../util/helpers.js')

const z = require('../validater/formatter.js')





//importing external package


console.log("hii")

router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module

    // console.log("Calling my function ", xyz.myFunction())
    // console.log("The value of the constant is ", xyz.myUrl)

    console.log('wellcome', x.welcomex())
    console.log('month', y.month())
    console.log('date', y.date())
    console.log(y.batch())
    console.log('string to changre upper ,lower,trim ', z.string1())
    console.log('upperCase' , z.upper())
    console.log('lowerCase' , z.lower())

  


    //Trying to use an external package called underscore
    // let myArray = ['Akash', 'Pritesh', 'Sabiha']
    // let result = underscore.first(myArray)
    // console.log("The result of underscores examples api is : ", result)
    //    

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const result = lodash.chunk(monthNames, 4)

    console.log(result)



    const oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19 ];
    console.log(lodash.tail(oddNum, 9));


    const Num = [2, 5, 4, 2, 7,7]
    console.log(lodash.union(Num));



    const keyValue = [['horror', 'The Shining'], ['drama', 'Titanic'], ['thriller', 'Shutter Island'], ['fantasy', 'Pans Labyrinth']]

    console.log(lodash.fromPairs(keyValue));



    //To be tried what happens if we send multiple response
    //res.send('My second api!')

 

    res.send('My first ever api!')
});

module.exports = router;

