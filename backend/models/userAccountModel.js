const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username:{
        required:[true,"Enter a valid name"],
        type:String,
        minLength:3,
        trim:true
    },
    useremail:{
        required:[true,"Enter a valid email"],
        type:String,
        minLength:5,
        trim:true
    },
    userpassword:{
        required:[true,"Enter a strong password"],
        type:String,
        minLength:3,
        trim:true
    },
    userrole:{
        required:true,
        type:String,
        trim:true,
        default:"user",
    },
    userimage:{
        // type:Buffer,
        type:String,
        required: [true, "Please add your image"]
    },
},

{
    timestamps:true
})


module.exports = mongoose.model("userAccountModel",userSchema)