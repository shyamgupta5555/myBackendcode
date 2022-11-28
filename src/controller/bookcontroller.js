const mongoose = require('mongoose')
const booksModel = require("../models/booksModel")
const userModel = require("../models/userModel")

//----------------//validation//----------------------------------------------------------------------
const objectId = mongoose.Types.ObjectId
const isbnvalidation =/^([+]\d{2})?\d{10,13}$/
function isValide(value){
    return (typeof value === "string" &&  value.trim().length > 0 && value.match(/^[A-Za-z][A-Za-z ,._]{1,100}$/))
}

//---------------------------------//book creation //--------------------------------------------------------
const createbooks = async function (req, res) {

    try {
        const data = req.body
        let { title, excerpt, userId, ISBN, category, subcategory, isDelete,releasedAt } = data
        if (Object.keys(req.body).length == 0) { res.status(404).send({ status: false, msg: "body is empty" }) }

        if (!title) { res.status(400).send({ status: false, msg: "please enter title" }) }
        if (!excerpt) { res.status(400).send({ status: false, msg: "please enter excerpt" }) }
        if (!userId) { res.status(400).send({ status: false, msg: "please enter userId" }) }
        if (!ISBN) { res.status(400).send({ status: false, msg: "please enter ISBN" }) }
        if (!category) { res.status(400).send({ status: false, msg: "please enter category" }) }
        if (!subcategory) { res.status(400).send({ status: false, msg: "please enter subcategory" }) }
        if (!releasedAt) { res.status(400).send({ status: false, msg: "please enter releasedAT" }) }

        if (!isValide(title)) { return res.status(400).send({ status: false, msg: "please enter properly title" }) }
        if (!isValide(excerpt)) { return res.status(400).send({ status: false, msg: "please enter properly excerrpt" }) }
        if (!isValide(category)) { return res.status(400).send({ status: false, msg: "please enter properly category" }) }
        if (!isValide(subcategory)) { return res.status(400).send({ status: false, msg: "please enter subcategory" }) }
        if (!objectId.isValid(userId)) { return res.status(400).send({ status: false, msg: "please enter valide userId" }) }
        if (!ISBN.match(isbnvalidation)) return res.status(400).send({ status: false, msg: "please enter valid ISBN" })


        if (isDelete == true) { data.deletedAt = new Date() }
        const gettitele = await booksModel.findOne({ title: title })
        if (gettitele) return res.status(400).send({ status: false, msg: "title is allready exsist" })

        const ISBNfind = await booksModel.findOne({ ISBN: ISBN })
        if (ISBNfind) return res.status(400).send({ status: false, msg: "ISBN is allready exsist" })

        const userid = await userModel.findOne({ _id: userId, isDelete: false })
        if (!userid) { return res.status(404).send({ status: false, msg: "user is not found" }) }
        const savedata = await booksModel.create(data)
        res.status(201).send({ status: true,message:"successfull book creation", data: savedata })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}



//---------------------------------//getbooks//------------------------------------------------------------

const getbooks = async function (req, res) {
    try {
        const input = req.query
        input.isDelete = false

        const data = await booksModel.find(input).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })
        if (data.length == 0) return res.status(404).send({ status: false, msg: "data is not found" })
        return res.status(200).send({ status: true, data: data })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}


module.exports.createbooks = createbooks
module.exports.getbooks = getbooks

