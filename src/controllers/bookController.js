
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")



const createBook= async function (req, res) {
    let book = req.body   
    console.log(book)

if(await authorModel.findById({_id : book.author_Id})){
    if(await publisherModel.findById({_id : book.publisher_Id})) {
        let bookCreated = await bookModel.create(book)
        res.send({data: bookCreated})
    }else{
        res.send({msg : " the  publisher id not match "})
    }
}else{
    res.send({ msg : "the author id not match "})
}

}



    // if((await publisherModel.findById({_id : book.publisher_Id})) &&(await authorModel.findById({_id : book.author_Id}) )) {
    //     let bookCreated = await bookModel.create(book)
    //     res.send({data: bookCreated})
    // }else{
    //     res.send({msg : "this is worng id "})
    // } 



const createAuthor  = async function(req ,res){
    let author = req.body
    let authorCreated = await authorModel.create(author)
    res.send({ data : authorCreated})
}



const createPublisher = async function(req,res){
    let publisher = req.body
    // console.log(publisher)
    let publisherCreated = await publisherModel.create(publisher)
    res.send({data : publisherCreated})

}


const allBookData = async function(req ,res){
    let book = await bookModel.find().populate('author_Id')
    // console.log(book)
    res.send({ date : book})
}





const putUpdateData = async function(req ,res){
  let a = await publisherModel.findOne({name : "Penguin"})
  let id = a._id
  let b = await publisherModel.findOne({name : "HarperCollins"})
  let id2 = b._id

 let update = await bookModel.updateMany(
    {publisher_Id :[ id ,id2]}, 
    {$set : {  "isHardCover" : true}}
 )
 console.log(update)
let  s = await  bookModel.find({"isHardCover" : true}).populate("author_Id").populate("publisher_Id")
res.send({msg :  s})
}


const putRatingUpdate  = async function( req ,res){
   let d = await authorModel.find({ rating : { $gt : 3.5 }})
 for ( i of d ){
     let id =  i._id
      let s = await  bookModel.updateMany(
        {author_Id : id },
        {$inc : {"price": 10} })
 }
 res.send({ msg : "this is update"  })
}




const getBooksData= async function (req, res) {
    let books = await  authorModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find()
    res.send({data: specificBook})

}
module.exports.putRatingUpdate =putRatingUpdate
module.exports.putUpdateData =putUpdateData
module.exports.allBookData = allBookData
module.exports.createPublisher = createPublisher
module.exports.createAuthor = createAuthor
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails


