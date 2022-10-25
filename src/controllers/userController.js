const UserModel= require("../author/authorModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}



const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find({sales : 20})

        res.send({msg: allUsers})
       //       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
   
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData



// .update(
//     {  sales : {$gt : 10} }, 
//     { $set : {sales : 20} }



// {sales : { $in:[ 75,100] }}).select({sales : 1 , _id : 0}