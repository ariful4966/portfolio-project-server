const decode = require('jwt-decode');
const Blog = require('../Models/Blog');
const User = require('../Models/User');

module.exports.blogGetController = async (req, res) => {
    try {
        await Blog.find({})
            .catch((err) => {
                res.send({
                    error: err.message,
                });
            })
            .then((result) => {
                res.send({
                    message: 'Blog Post Data is get Successfully',
                    data: result,
                });
            });
    } catch (error) {
        res.send({
            error: error.message,
        });
    }
};

// Blog Post Controller

module.exports.blogPostController = async (req, res) => {
    try {
        const token = req.headers.accesstoken;

        const { email } = decode(token);

        const extUser = await User.findOne({ email });

        if (extUser) {
            const blogPost = {
                title: req.body.title,
                body: req.body.body,
                author: extUser._id,
                image: {
                    display_url: req.body.image.display_url,
                    delete_url: req.body.image.delete_url,
                },
                website: req.body.webUrl,
            };

            await Blog.create(blogPost)
                .then(async (result) => {
                    if (result) {
                        await User.updateOne(
                            { email },
                            {
                                $push: {
                                    blog: result._id,
                                },
                            },
                            {
                                new: true,
                            },
                        );

                        res.status(200).send({
                            data: result,
                            message: 'Your Blog Post create successfully',
                        });
                    } else {
                        res.send({
                            error: 'Data Not Found',
                        });
                    }
                })
                .catch((err) => {
                    res.send({
                        error: err.message,
                    });
                });
        } else {
            res.status(400).send({
                error: 'User Is Not Found',
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
};
// blog Update controller
module.exports.blogUpdateControl = async (req, res) => {
    try{
        await Blog.findOneAndUpdate().then((result) => {
        
            res.send(result);
        });
    }catch(error){
        res.send({
            error: error.message
        })
    }
};

// Blog Delete Controller
module.exports.blogDeleteController = async (req, res) => {
   try{
    await Blog.findOneAndDelete().then((result) => {
       
        res.send(result);
    });
   }catch(error){
       res.send({
           error: error.message
       })
   }
};
