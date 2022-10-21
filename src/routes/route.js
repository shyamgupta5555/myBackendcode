const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore');
const { reduceRight } = require('underscore');

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha', 'Akash', 'Pritesh'])
    console.log('The first element received from underscope function is ' + firstElement)
    res.send('My first ever api!')
});



router.get("/movies/:indexNumber", function (req, res) {

    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    console.log(req.params.indexNumber)

    let movieIndex = req.params.indexNumber
    //check index value. less than 0 or greater than array (length - 1) are not valid
    if (movieIndex < 0 || movieIndex >= movies.length) {
        //if the index is invalid send an error message
        return res.send('The index value is not correct, Please check the it')
    }


    //if the index was valid send the movie at that index in response
    let requiredMovie = movies[movieIndex]
    res.send(requiredMovie)
})

router.get("/shoes", function (req, res) {
    let queryParams = req.query
    let brand = queryParams.brand
    let discount = queryParams.discount
    let color = queryParams.color
    let rating = queryParams.rating
    console.log('The brand selected is ', brand)
    console.log('The discount option selected is ', discount)
    console.log('The color selected is ', color)
    console.log("this iss rating", rating)
    res.send("dummy response")

})

// uses query params
router.get('/candidates', function (req, res) {

    console.log('Query paramters for this request are ' + JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is ' + state)
    console.log('Gender is ' + gender)
    console.log('District is ' + district)
    let candidates = ['Akash', 'Suman']
    res.send(candidates)
})

// use path param
router.get('/candidates/:canidatesName', function (req, res) {
    console.log('The request objects is ' + JSON.stringify(req.params))
    console.log('Candidates name is ' + req.params.canidatesName)
    res.send('Done')
})

router.get("/films", function (req, res) {
    const films = [{
        "id": 1,
        "name": "The Shining"
    }, {
        "id": 2,
        "name": "Incendies"
    }, {
        "id": 3,
        "name": "Rang de Basanti"
    }, {
        "id": 4,
        "name": "Finding Nemo"
    }]
    //send all the films
    res.send(films)
})

router.get("/films/:filmId", function (req, res) {
    const films = [{
        "id": 1,
        "name": "The Shining"
    }, {
        "id": 2,
        "name": "Incendies"
    }, {
        "id": 3,
        "name": "Rang de Basanti"
    }, {
        "id": 4,
        "name": "Finding Nemo"
    }]

    let filmId = req.params.filmId

    //iterate all the films
    //search for a film whose id matches with the id recevied in request
    for (let i = 0; i < films.length; i++) {
        let film = films[i]
        if (film.id == filmId) {
            //if there is a match return the response from here
            return res.send(film)
        }
    }

    //if there is no match give an error response
    res.send("The film id doesn't match any movie")

})

router.post('/create-movie', (res, req) => {
    const body = res.body; // {  }
    res.send(body);
})

// adding this comment for no reason



// let arr =[1,2,3,4,5,7,8,9]
// function avr(){



// }




function missingArray() {
    var arr = [1, 3, 5, 8, 9];
    var missing = [];
    for (let i = 0; i < arr[arr.length - 1]; i++) {
        if (!(arr.includes(i))) {
            missing.push(i);
        }

    }
    // return missing;
    console.log(missing)
} missingArray()

{




    function missingArray() {
        var arr = [1, 3, 5, 8, 9];
        var missing = [ ];
        for (let i = 0; i < arr[arr.length - 1]; i++) {
            if (!(arr.includes(i))) {
                missing.push(i);
            }
        }
        // return missing;
        console.log(missing)
    } missingArray()




}





router.get("/missing2", function (req, res) {
    const b = [1, 2, 3, 4, 5, 7, 8, 9]
    const h = b.reduce((hn, a, b) => hn = Math.max(a, b), 0)
    console.log(h)
    const sum = b.reduce((acc, x) => acc + x, 0)
    console.log(sum)

    miN = ((h) * (h + 1) / 2) - sum
    console.log(miN)
    res.send("console me dekho")
})






// 
// router.get('/missing' ,function(req,res){
// const arr=[32,34,35,37,38,39]
// function myfun(a){
//     for(i=0;i<(a.length)-1;i++){
//         if(a[i]+1==a[i+1]){
//             continue
//         }else{
//             console.log((a[i]+1))
//         }
//     }
// }
// (myfun(arr))



// res.send("this iss api missing number")


// const arr=[32,34,35,37,38,39]
// function av(a){
// for(i of a){
//     if()
// }
// }

// })

// router.get('/')




router.get('/sol1', function (req, res) {
    let arr = [1, 2, 3, 5, 6, 7]
    total = 0
    for (i of arr) {
        total += i
    }
    let lastnum = arr.pop()

    let sum = lastnum * (lastnum + 1) / 2
    let missingnumber = sum - total
    console.log(missingnumber)
    res.send({ data: missingnumber })
})







router.get('/sol2', function (req, res) {
    let arr = [33, 34, 35, 37, 38]
    total = 0
    let len = arr.length
    for (i of arr) {
        total += i
    }
    let lastnum = arr.pop()
    let fristnum = arr.shift()  
    let sum = (len + 1) * (fristnum + lastnum) / 2
    let misnum = sum - total
    // console.log(misnum)
    res.send({ data: misnum })
})




router.get('/api2', function (req, res) {
    // console.log("hii")
    res.send("hii shyam are you finr ")
})


router.get('/api1', function (req, res) {
    // console.log("hii")
    res.send({ a: 56, b: 56 })
    // ya data  object formete  mai server mai bejtte hai 
})



router.post('/test-post-4', function (req, res) {
    let arr = [12, "function"]
    let ele = req.body.element
    ArrayBuffer.push(ele)
    res.send({ msg: a, status: true })
})



























module.exports = router;

