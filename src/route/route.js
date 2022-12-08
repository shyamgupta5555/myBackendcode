const { application } = require('express')
const express=require('express')
const router=express.Router()
const coinModel = require('../models/coinModel')
const axios = require('axios')


// ====================== asiox api ==========//

router.get('/api/coins',async (req ,res)=>{

try {
   

    let options = {
        method: 'get',
        url: 'https://api.coincap.io/v2/assets'
    }
    let result = await axios(options)
    let data = result.data.data
     let b = data.sort((a,b)=>b['changePercent24Hr'] - a['changePercent24Hr'])
     
      let d = [ ]
     for(i of b){
        let element = i
        let obj = {
            name : element.name,
            symbol :element.symbol
        }
       let obj2 ={

        marketCapUsd:element.marketCapUsd,
        priceUsd:element.priceUsd

       }  
       
        let savedData = await coinModel.findOneAndUpdate(obj,{$set :obj2},{upsert :true,new :true})
             d.push(savedData)
             
     }

    res.status(200).send({ status : true , message : d })

}
catch (err) {
    res.status(500).send({ msg: err.message })
}


})



router.all('/*',function(req,res){
    return res.status(400).send({status:false, message:"pls provide valid path"})
})

module.exports=router