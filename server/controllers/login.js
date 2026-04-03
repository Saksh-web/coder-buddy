const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function isRegistered(req, res) {
    //if details match make a token and pass a cookie

     const { email, password } = req.body;
     const USER = await User.findOne({email})

     if(!USER){return res.json({message:"email not found"})}
     
    const isMatch =await bcrypt.compare(password,USER.password)
    if(!isMatch) {return res.json({message:"password din't match "})}
    //creating token
    const token = jwt.sign(
         {userId: USER._id ,
            username :USER.username
         },
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
    );
//cookies
res.cookie("token",token,{httpOnly:true});


    return res.redirect("/");
}

module.exports = { isRegistered };
