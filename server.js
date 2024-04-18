const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const { User } = require('./Schemas/UserSchema')
require("dotenv").config()

app.use(cors())
app.use(bodyparser.json())

async function connectTodb(){
    try {
        await mongoose.connect("mongodb+srv://lingeshkumarp2022cse:Seceuse.12@cluster0.d02yh6t.mongodb.net/jobapplication?retryWrites=true&w=majority&appName=Cluster0")
        const port = process.env.PORT || 4000
        console.log("DB CONNECTED SUCCESSFULLY")
        app.listen(port,()=>{
            console.log("connect to port "+port)
        })
    } catch (error) {
        console.error(error)
        console.log("NOT CONNECTED")
    }
     
}
connectTodb();

app.post('/signup',async(req,res)=>{
 const {username,email,password} = req.body
 try {
    await User.create(
        {
        "username":username,
        "email":email,
        "password":password
        }
            )
            res.status(201).json({status:"success",message:"Created user"})
            console.log("Signup user details: "+"USER : "+username+ " EMAIL : " +email+" PASSWORD : "+password)
            
 } catch (error) {
    console.log(error)
    res.status(500).json({status:"fail",message:"Unable to Create user"})
 }
})

app.post('/login',async(req,res)=>{
    try {
        console.log(req.body)
       const userDoc =  await User.findOne({
            "email":req.body.email
        })
        
        if(userDoc){
            if(userDoc.password === req.body.password){
                res.status(200).json({message:"login successful"})
            }
            else{
                res.status(401).json({message:"invalid credentials"})
            }
        }else{
            res.status(401).json({message:"user doesnt exist"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"not logged in"})
    }
})
