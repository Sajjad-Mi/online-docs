
const User = require("../models/User");
const Docs = require("../models/Docs");
module.exports.docsList_get = (req , res) =>{
    res.render('docslist');                                                    
}
module.exports.createDoc_post = async (req , res) =>{
  
    const user = await User.findOne({_id: req.id}, {username: 1, docsId:1});
    const doc = await Docs.create({title: req.body.title, body:'' });  
    doc.users.push(user.username);
    user.docsId.push({title:req.body.title, _id:doc._id});
    user.save();
    doc.save();
    res.redirect('/docslist');
    
 }