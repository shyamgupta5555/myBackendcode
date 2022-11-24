const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

// =============== regex========================//
const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const mobileValidation = /^([+]\d{2})?\d{10}$/
const nameregex = /^[a-zA-Z_ ]{1,30}$/


const createintern = async function (req, res) {
    try {
        const data = req.body;
        let { name, email, mobile, collegeName } = req.body
        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, message: "Please provide Details" })
        };
        if (!name) {
            return res.status(400).send({ status: false, message: "Please provide name" })
        };
        if (typeof name !== "string" || name.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid name" })
        };
        if (!name.match(nameregex)) {
            return res.status(400).send({ status: false, message: "Please provide valid name" })
        };


        if (!email) {
            return res.status(400).send({ status: false, message: "Please provide email" })
        };
        if (typeof email !== "string" || email.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid email" })
        };
        if (!email.match(emailValidation)) {
            return res.status(400).send({ status: false, message: "Please provide valid email" })
        };
        let duplicateemail = await internModel.findOne({ email: email });
        if (duplicateemail) {
            return res.status(400).send({ status: false, message: "email already existed" });
        };


        if (!mobile) {
            return res.status(400).send({ status: false, message: "Please provide mobile" })
        };
        if (typeof mobile !== "string" || mobile.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid mobile" })
        };
        if (!mobile.match(mobileValidation)) {
            return res.status(400).send({ status: false, message: "Please provide Valid Mobile Number" })
        };
        let duplicateMobile = await internModel.findOne({ mobile: mobile });
        if (duplicateMobile) {
            return res.status(400).send({ status: false, message: "mobile number already existed" });
        };
        
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "Please provide collegeName" })
        };
        if (typeof collegeName !== "string" || collegeName.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid collegeName" })
        }
        let collegeData = await collegeModel.findOne({ name: collegeName, isDeleted:false });
        if (!collegeData)
            return res.status(404).send({ status: false, message: "No Such College Found" });

        data.collegeId = collegeData._id.toString(); // to assign collegeId in  properties of data.
        let internData = await internModel.create(data);
        return res.status(201).send({ status: true, data: internData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};
module.exports.createintern = createintern