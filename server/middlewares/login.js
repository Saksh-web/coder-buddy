const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");



const auth = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){return res.redirect("/login")}

    const validated= jwt.verify(token,process.env.JWT_SECRET)
    req.user = validated;
    res.locals.user = validated; // makes userdetails available to ejs file
    next();
}



module.exports = auth