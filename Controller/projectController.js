const Web = require("../Models/Web");

module.exports.projectGetController = async(req, res)=>{
   await Web.find({})
    .catch(err=>{
        console.log(err);
    })
    .then(result=>{
        res.send(result)
    })
            
}

// Project Post Controller

module.exports.projectPostController = async(req, res)=>{
    
}