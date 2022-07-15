const jwt = require('jsonwebtoken');

//check the cookie validation
const checkAuthorization = (req, res , next)=>{  
    const token = req.cookies.jwt;                                       
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                console.log(err)
                res.redirect("/login")
            } else{
                req.id = decode.id
                req.username = decode.username
                next();
            }
        })
    } else{
        res.redirect("/login");
    }
}

module.exports = {checkAuthorization}