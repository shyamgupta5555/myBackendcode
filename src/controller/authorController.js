const authorModel = require("../models/authorModel");
const { isValidEmail, isValidString, isValidPassword } = require("../validator/validator");
const jwt=require("jsonwebtoken")
//================================// createauther //=========================================
const createauther = async function (req, res) {
  try {
    let data = req.body;
    const { fname, lname, title, email, password } = data;
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "request body is Empty" })
    if (!fname) return res.status(400).send({ status: false, msg: "fname is requred" });
    if (!lname) return res.status(400).send({ status: false, msg: "lname is requred" });
    if (!title) return res.status(400).send({ status: false, msg: "title is requred" });
    if (!email) return res.status(400).send({ status: false, msg: "email is requred" });
    if (!password) return res.status(400).send({ status: false, msg: "password is requred" });

    if (!isValidString(fname)) return res.status(400).send({ status: false, msg: "Please provide valid fname" })
    if (!isValidString(lname)) return res.status(400).send({ status: false, msg: "Please provide valid lname" })
    if (!isValidPassword(password)) return res.status(400).send({ status: false, msg: "Please provide valid password" })


    let titles = ["Mr", "Mrs", "Miss"]
    if (!titles.includes(title)) return res.status(400).send({ status: false, msg: "Please provide the title in these options - Mr || Mrs || Miss" })
    if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "invalid emailid" })

    let uniqueEmail = await authorModel.findOne({ email: email })
    if (uniqueEmail) return res.status(400).send({ status: false, message: "email is already exist" })

    let savedData = await authorModel.create(data);
    return res.status(201).send({ msg: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};
  //======================//login//=====================================
  const login= async function (req,res){
try{
  let email =req.body.email
let password =req.body.password
if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "invalid emailid" })
let user =await authorModel.findOne({email:email,password:password})
if(!user) return res.status(400).send({status:false,msg:"emailId and password is not found in auther database"})

let token= jwt.sign(
  {userId:user._id}
,"project1group11"
)
res.status(200).send({status:true,data:{token:token}})

}catch (error) {
  return res.status(500).send({ status: false, msg: error.message });
}
  }
//==================// module exports //==============================================

module.exports = { createauther,login }
