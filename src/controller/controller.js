const userModel = require('../model/user')
const jwt = require('jsonwebtoken')



  // ====================== create data

const createUser = async function (req, res) {
  try {

    let data = req.body
    // console.log(data)
    let { fristName, lastName, emailId, password, isDeleted, gender, age } = data
    // console.log(fristName, lastName, emailId, password, isDeleted, gender, age)

    if (fristName == undefined || lastName == undefined || emailId == undefined || password == undefined || isDeleted == undefined || gender == undefined || age == undefined) {
      return res.status(400).send({ msg: "req body mai data pura nahi hai" })

    }
    let createUser = await userModel.create(data)
    res.status(201).send({ msg: createUser })

  } catch (error) {
    console.log(error.message, "this is error")
    res.status(500).send({ msg: "error", error: error.message })
  }
}
//  ==================login data

const login = async function (req, res) {

  try {
    let data = req.body
    let { password, emailId } = data
    if (password == undefined || emailId == undefined) return res.status(404).send({ msg: "this is not asign value password and mailid" })

    let checkData = await userModel.findOne({ password: password, emailId: emailId })
    if (!checkData) return res.status(404).send({ msg: "password and emailid not match " })

    let token = jwt.sign(
      {
        userId: checkData._id.toString(),
        work: "coder",
      },
      "this is shyam"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });


  } catch (error) {
    console.log(error.massage, "this is error")
    res.status(400).send({ error: error.massage, msg: "error" })
  }

}


// =================== get data  

const getUserData = async function (req, res) {
  try {

    let id = req.params.userId
    console.log(id)
    let b = await userModel.findById(id)
    res.send({ msg: b })

  } catch (error) {

    console.log(error.massage, "this is error")
    res.status(500).send({ error: error.massage, msg: "error" })
  }


};

// ==================== update api
const updatedata = async function (req, res) {
  try {
    let userId = req.params.userId
    let userData = req.body;

    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    if(!updatedUser) return res.send("this is user isd not match")
    res.send({ status: updatedUser });
  } catch (error) {
    console.log(error.massage, "this is error")
    res.status(400).send({ error: error.massage, msg: "error" })
  }

};


// ==================== delet api

const delet = async function (req, res) {
  try {
    let userId = req.params.userId
    let userData = req.body;

    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    if(!updatedUser) return res.send("this is user isd not match")
  
    res.send({ status: updatedUser });

  } catch (error) {
    console.log(error.massage, "this is error")
    res.status(400).send({ error: error.massage, msg: "error" })
  }

};

module.exports.updatedata =updatedata
module.exports.delet = delet
module.exports.getUserData = getUserData
module.exports.login = login
module.exports.createUser = createUser