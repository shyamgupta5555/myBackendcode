const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{
        type : String,
        required : true
    }, 
    authorName: String, 
    publishYear : Number,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    tags: [String],
    totalPages : Number ,
    stockAvailable : Boolean
    
    // sales: {type: Number, default: 10}
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
