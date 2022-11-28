const { isValidObjectId } = require("mongoose")
const booksModel=require("../Model/BooksModel")
const userModel=require("../Model/UserMode.js")
const {isValide}=require("../Valideter/valideter")
const objectId = mongoose.Types.ObjectId

const createbooks=async function(req,res){
    
   try{ const data=req.body
    if(Object.keys(req.body).length==0)
    { res.status(404).send({status:false,msg:"body is empty"})
    }
 if(!data.title){res.status(400).send({status:false,msg:"please enter title"})}
 if(!data.excerpt){res.status(400).send({status:false,msg:"please enter excerpt"})}
 if(!data.userId){res.status(400).send({status:false,msg:"please enter userId"})}
 if(!data.ISBN){res.status(400).send({status:false,msg:"please enter ISBN"})}
 if(!data.category){res.status(400).send({status:false,msg:"please enter category"})}
 if(!data.subcategory){res.status(400).send({status:false,msg:"please enter subcategory"})}
 if(!data.releasedAt){res.status(400).send({status:false,msg:"please enter releasedAT"})}
 
 if(isValide(title)){return res.status(400).send({status:false,msg:"please enter properly title"})}
 if(isValide(excerpt)){return res.status(400).send({status:false,msg:"please enter properly excerrpt"})}
 if(isValide(category)){return res.status(400).send({status:false,msg:"please enter properly category"})}
 if(isValide(subcategory)){return res.status(400).send({status:false,msg:"please enter subcategory"})}
 if(!objectId.isValid(userId)){return res.status(400).send({status:false,msg:"please enter valide userId"})}
 

 const userid=await userModel.findOne({_id:userId})
 if(!userid){
 return res.status(404).send({status:false,msg:"userid is not valid"})}
  const savedata=await booksModel.create(data)
    res.status(201).send({status:true,data:savedata})
 }catch(err){return res.status(500).send({status:false,msg:err.message})}



   
}



 const getbooks=async function(req,res){
    try{const input=req.query
    input.isDelete=false
   const data=await booksModel.find(input).select({ title:1, excerpt:1, userId:1, category:1, releasedAt:1, reviews:1})
    if(data.length==0) return res.status(404).send({status:false,msg:"data is not found"})
    return res.status(200).send({status:true,data:data})
    }catch(err){return res.status(500).send({status:false,msg:err.message})}

 }


module.exports.createbooks=createbooks
module.exports.getbooks=getbooks

