const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String, 
    authorName: String, 
    tags: [String],
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    sales: {type: Number, default: 10},
    
    // " best boook on earth"   [ "Nodejs in detail" , "mongodb in detail", "fronend in detail"] 
    // {
        // "ch1 ": "awesome intro to JS",
        // "ch2" : "intro to nodejs",
        // "ch3" : "intro to db"
    //  }
    summary :  mongoose.Schema.Types.Mixed,
    isDeleted: Boolean //true on book deletion i.e you flag the document/data as isDeleted: true..(mark "dirty")

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users


var timestamp = new Date(); // current time as number
console.log(timestamp)


// let a = [2,3,5,7,9]
// const b =[]
// for(i of a){
//     let isPrime=true
//     for(j=2;j<i;j++){
//         if(i%j==0){
//             isPrime=false
//             break
//         }
//         // }else{
//         //     isPrime=true
//         // }
//         }
//     if(isPrime){
//         b.push(i)
//     }
// }
// console.log(b)