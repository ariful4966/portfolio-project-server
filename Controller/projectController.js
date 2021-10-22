const Project = require("../Models/Project");

module.exports.projectGetController = async(req, res)=>{
   await Project.find({})
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