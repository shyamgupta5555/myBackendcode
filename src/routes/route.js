const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    console.log("The path params in the request are : ", req.params)
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})


// Example 1 for path params
router.get('/students/:studentName', function(req, res){
    // ':' denotes that the following part of route is a variable
    // The value of this variable is what we are sending in the request url after /students
    // This value is set in the form of an object inside req.params
    // The object contain key value pairs
    // key is the variable in the route
    // value is whatever dynamic value sent in the request url
    let myParams = req.params

    // params attribute is fixed in a request object
    // params contains the path parameters object
    console.log("The path params in the request are : ", myParams)
    res.send('The full name is ' + myParams.studentName )
})

// Example 2 for path params
router.get('/student-details/:name', function(req, res){
    let requestParams = req.params
    console.log("This is the request ", requestParams)
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    res.send('Dummy response')
})


router.get('/movies', function (req,res){
    
    const mo=["Midnightmass","Friday 13","NArnia","Harry Potter"]
    res.send(mo)
})

router.get('/movies/:index', function (req,res){
     let inParams = req.params
     console.log(inParams)
     const mo=["Midnightmass","Friday 13","NArnia","Harry Potter"]
     if(inParams.index>mo.length){
        res.send("right valid")
     }
    
    
    res.send(mo[inParams.index])
})

router.get('/films', function (req,res){
    
    const fi=[ {
        id: 1,
        name: "The Shining"
       },
        {
        id: 2,
        name: "Incendies"
       }, {
        id: 3,
        name: "Rang de Basanti"
       }, {
        id: 4,
        name: "Finding Nemo"
       }]
       
    res.send(fi)
})

router.get('/films/:id', function (req,res){

    let idParam=req.params
    
    const fi=[ {
        id: 1,
        name: "The Shining"
       },
        {
        id: 2,
        name: "Incendies"
       }, {
        id: 3,
        name: "Rang de Basanti"
       }, {
        id: 4,
        name: "Finding Nemo"
       }]

       
       if(idParam.id>(fi.length+1)||idParam.id==0){
        res.send("not valid")} 
       for(i of fi){
        if(i.id==idParam.id){
            console.log(i)
            res.send(i.name)
        }
       }
        // res.send("enter valid")
       


    //    console.log(idParam)
       
    // res.send(idParam.name)
})

module.exports = router;