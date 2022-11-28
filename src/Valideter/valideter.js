const booksModel = require("../models/booksModel")




const idCharacterValid = function (value) {
    return mongoose.Types.ObjectId.isValid(value); 
  }
//   const isValidPassword = function (pw) {
//     let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;
//     if (pass.test(pw)) return true;
//   };
  
  

module.exports.isValide=isValide