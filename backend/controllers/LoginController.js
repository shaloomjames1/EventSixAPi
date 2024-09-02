const userModel = require("../models/userAccountModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const login = async(req,res)=>{
const {useremail,userpassword} = req.body;

try {
    // check user  existance
    const userExist = userModel.findOne({useremail});
    
    // if user not exist return error
    if(!userExist) return res.status(401).json({err:"Credentials wrong"})

    // compare the password
    const comparePass =  bcrypt.compare(userpassword,userExist.userpassword);

    // if password is wrong return error
    if(!comparePass) return res.status(401).json({err:"Credential's wrong p"})

        // generate jwt token
        const token = jwt.sign({userid:userExist._id,useremail:userExist.useremail,userrole:userExist.userrole},
            process.env.jwt_Secret_Key,
            {expiresIn:'30d'}
        )

        return res.status(200).json({token})
} catch (error) {
    res.status(500).json({error:"Internal server error"})
}

}

module.exports = {login} 