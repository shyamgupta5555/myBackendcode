const mongoose = require('mongoose')
const blogModel = require('../models/bolgModel')
const authorModel = require('../models/authorModel')
const bolgModel = require('../models/bolgModel')
const ObjectId = mongoose.Types.ObjectId

// ==================== regex ===========================//

const validation = /^[a-zA-Z ]{1,30}$/

//===========================// createBlog //============================================

exports.createBlog = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "request body is Empty" })

        const { title, body, authorId, category } = data

        if (!title) return res.status(404).send({ status: false, msg: "title is requred" });
        if (!body) return res.status(404).send({ status: false, msg: "body is requred" });
        if (!authorId) return res.status(404).send({ status: false, msg: "authorId is requred" });
        if (!category) return res.status(404).send({ status: false, msg: "category is requred" });


        if (!title.match(validation)) return res.status(404).send({ status: false, msg: "Please provide valid title" })
        if (!body.match(validation)) return res.status(404).send({ status: false, msg: "Please provide valid body" })
        if (!category.match(validation)) return res.status(404).send({ status: false, msg: "Please provide valid category" });
       
      
        if (data.isPublished == true) data.publishedAt = new Date().toDateString()
        const savedData = await blogModel.create(data)
        return res.status(201).send({ status: true, data: savedData })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


//===========================// getData //=============================================================

exports.getData = async function (req, res) {
    try {

        let data = req.query
        data.isDeleted = false
        data.isPublished = true

        let findData = await blogModel.find(data)
        if (findData.length == 0) return res.status(404).send({ status: false, message: "not found data" })
        res.status(200).send({ status: true, msg: findData })

    } catch (err) {
        res.status(200).send({ status: false, message: err.message })
    }
}
//===============================// updateBlog //=============================================

exports.updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId

        if (Object.keys(req.body).length == 0) return res.status(404).send({ status: false, msg: "no data for update" })
        const { title, body, category, tags, subcategory } = req.body

        let time = new Date(Date.now())
        let obj = { title: title, body: body }
        let obj2 = { tags: tags, subcategory: subcategory }

        let updateBlog = await blogModel.findOneAndUpdate({ _id: blogId }, {$set: obj, $push: obj2 },
            { new: true }
        )
        res.status(200).send({ status: true, msg: updateBlog })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

//==========================================// DELETEdata //===========================================

exports.DELETEdata = async function (req, res) {
    try {
        let data = req.params.blogId
        if (!ObjectId.isValid(data)) return res.status(404).send({ status: false, msg: "Please provide the valid blogid" })

        let savedata = await blogModel.findById(data)
        if (!savedata) return res.status(404).send({ status: false, msg: "blogs not found" })
        if (savedata.isDeleted == true) return res.status(404).send({ status: true, msg: "this data is alredy deleted" })

        await blogModel.findByIdAndUpdate(data, { $set: { isDeleted: true, deletedAt: new Date(Date.now()) } }, { new: true })
        res.status(200).send({status :true , message :"deleted is sucessfully"})
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })

    }

}

//===================================// deleteby query //==============================================

exports.deleteByQuery = async function (req, res) {
    try {
        let data= req.query
       
        let findData = await blogModel.updateMany(data ,{isDeleted :true},{new: true})
        
        return res.status(200).send({ status: true, data:findData })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}



