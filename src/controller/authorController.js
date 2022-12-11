const authorModel = require("../models/authorModel");
const jwt=require("jsonwebtoken")

// =================================================//


let validation = /^[a-zA-Z ]{1,30}$/
let emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let passwordRagex = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/)


//================================// createauther //=========================================
exports.createauther = async function (req, res) {
  try {
    let data = req.body;
    const { fname, lname, title, email, password } = data;
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "request body is Empty" })

    if (!fname) return res.status(400).send({ status: false, msg: "provied a fname" });
    if (!lname) return res.status(400).send({ status: false, msg: "provied a lname" });
    if (!title) return res.status(400).send({ status: false, msg: "provied a title" });
    if (!email) return res.status(400).send({ status: false, msg: "provied a email " });
    if (!password) return res.status(400).send({ status: false, msg: "provied a password " });

    if(!fname.match(validation)) return res.status(404).send({ status: false, msg: " provied vaild fname" });
    if(!lname.match(validation)) return res.status(404).send({ status: false, msg: "provied vaild lname" });
    let titles = ["Mr", "Mrs", "Miss"]
    if (!titles.includes(title)) return res.status(404).send({ status: false, msg: "Please provide the title like Mr ||Miss "})
    if (!email.match(emailRegex)) return res.status(404).send({ status: false, msg: "invalid emailid" })
    if (!password.match(passwordRagex)) return res.status(404).send({ status: false, msg: "Please provide valid password" })

   
    let uniqueEmail = await authorModel.findOne({ email: email })
    if (uniqueEmail) return res.status(404).send({ status: false, message: "email is already exist" })
    

    let savedData = await authorModel.create(data);
    return res.status(201).send({status:true, msg: savedData });

  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

  //======================//login//=====================================

exports.login= async function (req,res){
try{
  let {email ,password} =req.body
  if(Object.keys.length == 0) return res.status(400).send({status: false , message : "body is emty"})

if (!email.match(emailRegex)) return res.status(400).send({ status: false, msg: "invalid emailid" })

let user =await authorModel.findOne({email:email,password:password})
if(!user) return res.status(404).send({status:false,msg:"emailId and password not match "})

let token= jwt.sign(
  {userId:user._id}  //peload
,"project1group11" //privet key
)
res.setHeader("x-api-key",token)
res.status(200).send({status:true,data:{token:token}})        
    
}catch (error) {
  return res.status(500).send({ status: false, msg: error.message });
}
  }


 
