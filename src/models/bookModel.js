const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author_Id: {
        type: ObjectId,
        ref: "newAuthor"
    }, 

    price: Number,
    ratings: Number,
    publisher_Id: {
        type : ObjectId,
        ref : "newPublisher"
    },
    isHardCover :{
        type : Boolean,
        default : false
    }
}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
