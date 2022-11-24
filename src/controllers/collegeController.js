const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const axios = require('axios')


// =================== regex =================//

const nameregex = /^[a-zA-Z ]{1,30}$/
const fullNameRegex = /^[A-Za-z][A-Za-z ,._]{5,50}$/


// ==================== 1 API============//

const createcollege = async function (req, res) {
  try {
    let { name, fullName, logoLink } = req.body;

    if (!Object.keys(req.body).length > 0) {
      return res.status(400).send({ status: false, message: "Please provide Details" })
    };
    
    // =========== name validation========//

    if (!name) {
      return res.status(400).send({ status: false, message: "Please provide name" })
    };
    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).send({ status: false, msg: "Enter valid name" })
    };

    if (!name.match(nameregex)) {
      return res.status(400).send({ status: false, message: "Please provide valid name" })
    };
    let duplicateName = await collegeModel.findOne({ name: name });
    if (duplicateName) {
      return res.status(400).send({ status: false, message: "College name already existed" });
    };

    //  ======= full name validation =======//

    if (!fullName) {
      return res.status(400).send({ status: false, message: "Please provide fullName" })
    };
    if (typeof fullName !== "string" || fullName.trim().length === 0) {
      return res.status(400).send({ status: false, msg: "Enter valid fullName" })
    };
    if (!fullName.match(fullNameRegex)) return res.status(400).send({ status: false, message: "Please provide valid fullName" })

    let duplicatefullName = await collegeModel.findOne({ fullName: fullName }); // inDB //req.body
    if (duplicatefullName) {
      return res.status(400).send({ status: false, message: "College fullName already existed" });
    };

    // ======== logo link validation=======//

    if (!logoLink) {
      return res.status(400).send({ status: false, message: "Please provide logolink" })
    };
    if (typeof logoLink !== "string" || logoLink.trim().length === 0) {
      return res.status(400).send({ status: false, message: "Enter valid logoLink" })
    };
    let linkIscorrect
    await axios.get(logoLink)
      .then((res) => { linkIscorrect = true })
      .catch((error) => { linkIscorrect = false })
    if (linkIscorrect === false) return res.status(400).send({ status: false, message: "Please provide valid logoLink" })

    // ==== create colleges =======//

    let savedData = await collegeModel.create(req.body)
    let result = { name: savedData.name, fullName: savedData.fullName, logoLink: savedData.logoLink, isDeleted: savedData.isDeleted }
    return res.status(201).send({ status: true, data: result })

  } catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
}


// ================================== 2 API==============//


const getdetailsofinterns = async function (req, res) {
  try {

    let { collegeName } = req.query;
    if (!collegeName) {
      return res.status(400).send({ status: false, message: "Please provide collegeName" })
    };

    let college = await collegeModel.findOne({ name: collegeName }).select({ createdAt: 0, updatedAt: 0, __v: 0, isDeleted: 0 });

    if (!college) {
      return res.status(404).send({ status: false, message: "Please provide valid collegeName" });
    }
    let interns = await internModel.find({ collegeId: college._id }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

    if (interns.length == 0) {
      var x = `no interns of ${collegeName} college`;
    } else {
      var x = interns;
    }
    college._doc.interns = x

    //On mongoose find query execution, response data as multiple objects, the real data is in _doc property or field, its only occurs in some scenario. I can handle the data by getting Obj._doc.something.
    return res.status(200).send({ status: true, data: college })

  } catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
}

module.exports.createcollege = createcollege
module.exports.getdetailsofinterns = getdetailsofinterns