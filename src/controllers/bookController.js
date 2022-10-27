const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel = require("../models/authorModel")
const { all } = require("../routes/route")
const { find } = require("../models/userModel")
// const bookModel = require("../models/bookModel")


const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const createAuthor = async function( req ,res){
    let data  =  req.body 
    let savedData = await AuthorModel.create(data)
    res.send({msg : savedData})
}


const getBooksData= async function (req, res) {
let allAuthorName= await AuthorModel.find( { author_name:"J.k Rowling" } )
 const  [ obj]  = allAuthorName
const b =  obj.author_id
let allBook = await BookModel.find({author_id : b})
 res.send({msg: allBook})

}



const findOneAndUpdate  = async function(req ,res){
    let findBookUpdatePrice = await BookModel.findOneAndUpdate( 
                {    name:"Two states" } , //condition
                { $set: { price: 20}  })
     let b = findBookUpdatePrice.author_id
 let findAuthor = await  AuthorModel.findOne({author_id : b} )
//    let [ asb ] = findAuthor
  
    res.send({ msg :[ findAuthor.author_name , findBookUpdatePrice.price]})
}



const findPrice = async function( req ,res){
    let allBooksPrices = await BookModel.find({ price : {$gte: 50, $lte: 100} } )
  let a  = [ ]
  for(i of allBooksPrices){
    let  AuthorName=await AuthorModel.findOne({author_id:(i.author_id)}).select({author_name:1, _id:0})
     a.push(i)
     a.push(AuthorName)

}
res.send({ msg : a})
}






// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})

// }

// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )




//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  

//      )
//      res.send( { msg: allBooks})
// }



// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.findPrice = findPrice
module.exports.findOneAndUpdate = findOneAndUpdate
module.exports.getBooksData =getBooksData
module.exports.createAuthor= createAuthor
module.exports.createBook= createBook


// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks
