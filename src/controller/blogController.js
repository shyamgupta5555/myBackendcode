const blogModel= require('../models/bolgModel')
const authorModel= require('../models/authorModel')
const createBlog =async function (req,res){

try{
    const data= req.body
    if(Object.keys(data).length==0)  return res.status(400).send({status:false,msg:"request body is Empty"})
    const {title,body,authorId,category}=data

    if (!title)  return res.status(400).send({ status: false, msg: "title is requred" });
    if (!body)  return res.status(400).send({ status: false, msg: "body is requred" });
    if (!authorId)  return res.status(400).send({ status: false, msg: "authorId is requred" });
    if (!category)  return res.status(400).send({ status: false, msg: "category is requred" });
     
    const authordata = await authorModel.find({_id:data.authorId})
    if(!authordata)  return res.status(404).send({status:false,msg:"Invalid author Id"})
    
    const savedData = await blogModel.create(data)
    return  res.status(201).send({status:true,data:savedData})
}catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}

module.exports.createBlog= createBlog
