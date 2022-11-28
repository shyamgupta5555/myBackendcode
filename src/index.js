const express=require('express')
const mongoose=require('mongoose')
const route=require('./route/route.js')

const app=express()
app.use(express.json())

mongoose.connect("mongodb+srv://shyamgupta:.T!8NRrzf6FyMYc@cluster0.dbdyccj.mongodb.net/group30Database",{
    useNewUrlParser:true})
.then(()=>console.log("mongodb is connected"))
.catch(Error=>console.log(Error))

app.use("/",route)
app.listen(process.env.PORT||3000,function(){
    console.log("express app running on PORT"+" "+(process.env.PORT || 3000))
})