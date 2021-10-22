const Blog = require("../Models/Blog");

module.exports.blogGetController = async(req, res)=>{
   await Blog.find({})
    .catch(err=>{
        console.log(err);
    })
    .then(result=>{
        res.send(result)
    })
} 