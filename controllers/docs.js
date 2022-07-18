
const User = require("../models/User");
const Docs = require("../models/Docs");

module.exports.docsList_get = async (req , res) =>{
    const userDocs = await User.findOne({_id: req.id}, {docsId: 1});
    res.render('docslist', {docs: userDocs.docsId});                                                    
}
module.exports.createDoc_post = async (req , res) =>{
  
    const user = await User.findOne({_id: req.id}, {username: 1, docsId: 1});
    const doc = await Docs.create({title: req.body.title, body:'' });  
    doc.users.push(user.username);
    user.docsId.push({title:req.body.title, _id:doc._id});
    user.save();
    doc.save();
    res.redirect('/docslist');
    
 }
 module.exports.doc_get = async (req , res) =>{
  //first check the requested document to see if user can access it
   
    let hasAccess = false;
    const user = await User.findOne({_id: req.id}, {docsId: 1})
    user.docsId.forEach(doc => {
        if(doc._id == req.params.id){
            hasAccess = true;
        }
    });
    if(hasAccess == true ){  
        const doc = await Docs.findOne({_id: req.params.id});
        console.log(doc)  
    }                                                           
    
}