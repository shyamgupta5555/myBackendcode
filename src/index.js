const bodyParser = require('body-parser')
const express= require('express')
const mongoose = require('mongoose')
const route=require('./route/route')

const app=express()

app.use(bodyParser.json())

mongoose.connect('mongodb+srv://shyamgupta:.T!8NRrzf6FyMYc@cluster0.dbdyccj.mongodb.net/shyam-db', {useNewUrlParser: true})
.then(()=> console.log("MongoDB connected"))
.catch((error)=> console.log(error))

app.listen(3000,function (){
   console.log("Port connected to 3000")
})  

app.use('/',route)

