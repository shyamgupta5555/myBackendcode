const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    bookName: String,
    authorName: String,
    catagory : {
        type : String ,
        enum : ["male" , "female" , "other" ]
    },
    year : Number,
    sales : Number
}, { timestamps: true });

module.exports = mongoose.model('User', authorSchema) //users



// String, Number
// Boolean, Object/json, array