const mongo  = require('mongoose')

const UserSchema = new mongo.Schema({
    username:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const User  = mongo.model('User',UserSchema)
module.exports ={User}