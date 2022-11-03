const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    user_Id: {
     type : ObjectId,
     ref : "User"

    },
    product_Id: {
        type : ObjectId,
        ref : "Product"
    },
    amount: Number,
    isFreeAppUser: Boolean
    ,
    date: Number
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema) //users
