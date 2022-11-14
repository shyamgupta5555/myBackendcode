const authorModel = require("../models/authorModel");

const createauther = async function (req, res) {
  try {
    let data = req.body;
    const { fname, lname, title, email,password } = data;
    if(Object.keys(data).length==0)  return res.status(400).send({status:false,msg:"request body is Empty"})
    if (!fname)  return res.status(400).send({ status: false, msg: "fname is requred" });
    if (!lname)  return res.status(400).send({ status: false, msg: "lname is requred" });
    if (!title)  return res.status(400).send({ status: false, msg: "title is requred" });
    if (!email)  return res.status(400).send({ status: false, msg: "email is requred" });
    if (!password)  return res.status(400).send({ status: false, msg: "password is requred" });
      
    let savedData = await authorModel.create(data);
    return res.status(201).send({ msg: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};
module.exports.createauther = createauther;
