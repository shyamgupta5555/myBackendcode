const blogModel= require('../models/bolgModel')
const authorModel= require('../models/authorModel')
const {idCharacterValid,isValidString} = require("../validator/validator");

const createBlog =async function (req,res){
    try{
        const data= req.body
        if(Object.keys(data).length==0)  return res.status(400).send({status:false,msg:"request body is Empty"})
        const {title,body,authorId,category}=data

        if (!title)  return res.status(400).send({ status: false, msg: "title is requred" });
        if (!body)  return res.status(400).send({ status: false, msg: "body is requred" });
        if (!authorId)  return res.status(400).send({ status: false, msg: "authorId is requred" });
        if (!category)  return res.status(400).send({ status: false, msg: "category is requred" });

        if(!isValidString(title))   return res.status(400).send({ status: false, msg: "Please provide valid title" })
        if(!isValidString(body))   return res.status(400).send({ status: false, msg: "Please provide valid body" })
        if(!isValidString(category))   return res.status(400).send({ status: false, msg: "Please provide valid category" });
        
        if(!idCharacterValid(authorId))   return res.status(400).send({status:false,msg:"Please provide the valid authorid"})
        const authordata = await authorModel.find({_id:data.authorId})
        if(!authordata)  return res.status(400).send({status:false,msg:"author Id doesn't exist"})
        
        const savedData = await blogModel.create(data)
        return  res.status(201).send({status:true,data:savedData})
     }catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}

const getData =async function (req,res){
    try {
        
        if(Object.keys(req.query).length==0) { 
        let savedata = await blogModel.find({ isDeleted: false, isPublished: true })
        if (savedata.length == 0) {
            return res.status(404).send({ status: false, msg: "blogs not found" })
        } else {  
            return res.status(200).send({ status: true, data: savedata })
        }}

        if(Object.keys(req.query).length>0){
            let savedata2=await blogModel.find({$and:[{ isDeleted: false, isPublished: true } , req.query]})
            if(savedata2.length==0)  return res.status(404).send({status:false,message:"this blog not found"})

            res.status(200).send({ status:true,msg:savedata2})
        }
   
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}

const deleteunpublished =async function (req,res){
    try{
            let datas = await blogModel.updateMany({$and:[{isDeleted:false},req.query]},{isDeleted:true,deletedAt:new Date(Date.now())},{new:true})
            if(datas.modifiedCount==0)  return res.status(404).send({status:false,message:"Blogs not found with unpublished"})  

            return res.status(200).send({status:true,data:datas})
      
    }catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}

module.exports.getData=getData 
module.exports.createBlog= createBlog 
module.exports.deleteunpublished=deleteunpublished
