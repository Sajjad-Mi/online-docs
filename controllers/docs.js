
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
    doc.admins.push(user.username);
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
        const isAdmin = doc.admins.includes(req.username);
        res.render('doc', {title: doc.title, docid:req.params.id, username:req.username, docsContent:doc.body, users:doc.users, isAdmin});
    }                                                           
    
}
module.exports.save_patch = async (req , res) =>{  
    try{
        const doc = await Docs.findOneAndUpdate({_id:req.body.docId}, { body: req.body.docsContent });  
        res.json({ massage: "saved" });
    }catch(e){
        res.status(500).json({ message: "save failed"});
    }    
}

//add a user only if the request is from admin
module.exports.addUser_post = async (req , res) =>{
    
    const doc = await Docs.findOne({_id:req.body.docId});
    
    if(doc.admins.includes(req.username)){
        const user = await User.findOne({'username':`${req.body.newUser}`});   
        doc.users.push(user.username);
        user.docsId.push({title:req.body.title, _id:req.body.docId});
        doc.save();
        user.save();
        res.json({ massage: "user added" });
    }else{
        res.status(403).json({ message: "save failed"});

    }
        
    
 }