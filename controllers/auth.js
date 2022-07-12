const User = require("../models/User");

//check the errors for showing to the user
const checkEmailError = (error)=>{
    let errorMessage = ""
    if(error.message.includes("email") && error.code === 11000 ){
        errorMessage = "This email is already sign up";
    }
    if(error.message.includes("enter a valid")){
        errorMessage = "Please enter a valid email";
    }
    return errorMessage;
}
const checkUsernameErr = (err)=>{
    let errorMessage = "";
    if(error.message.includes("username") &&err.code === 11000){
        errorMessage = "This username is already exists";
    }
    return errorMessage;
}
const checkPassError = (error)=>{
    let errorMessage = ""
    if(error.includes("char")){
        errorMessage = "Your password should be at least 6 char"
    }

    return errorMessage;
}


module.exports.signup_post = async(req , res) =>{
    try {
        const user = await  User.create({username: req.body.username,
            email:req.body.email,
            password: req.body.password,
            name: req.body.name,
            username: req.body.username 
        });     
        
        res.status(201).json({ user: req.body.email });
    } catch (err) {
        console.log(err.message)
        let error = {passwordError:checkPassError(err.message), emailError: checkEmailError(err), usernameError:checkUsernameErr(err)};
        res.status(400).json({ error });
    }
}
