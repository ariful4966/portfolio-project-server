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


// Blog Post Controller

module.exports.blogPostController = async(req, res, next)=>{

    const blog = req.body;
    await Blog.create({})
    .then((err, doc)=>{
        if(err){
            res.statue(500).send('Serversite Error')
        }
        else{
            res.send(doc)
        }
    })
    .catch(err=>{
        res.send(err)
    })
}


// blog Update controller
module.exports.blogUpdateControl = async(req, res, next)=>{
    const blogId = req;
    await Blog.findOneAndUpdate()
    .then((err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
};

// Blog Delete Controller
module.exports.blogDeleteController= async(req, res, next)=>{
    const data = req.body;

   await Blog.findOneAndDelete()
   .then((err, result)=>{
       if(err){
           res.send(err)
       }
       res.send(result)
   })

}