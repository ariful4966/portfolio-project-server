const decode = require('jwt-decode');
const Web = require('../Models/Web');
const User = require('../Models/User');

module.exports.webAppGetController = async (req, res) => {
    try {
        await Web.find({})
            .then((result) => {
                res.send({
                    message: 'Your Web Application Data get successfully',
                    data: result,
                });
            })
            .catch((err) => {
                res.send({
                    error: err.message,
                });
            });
    } catch (error) {
        res.send({
            error: error.message,
        });
    }
};

// Project Post Controller

module.exports.webAppPostController = async (req, res) => {
    try {
        const token = req.headers.accesstoken;

        const { email } = decode(token);

        const extUser = await User.findOne({ email });

        if (extUser) {
            const webPost = {
                title: req.body.title,
                body: req.body.body,
                author: extUser._id,
                image: {
                    display_url: req.body.image.display_url,
                    delete_url: req.body.image.delete_url,
                },
                language: req.body.lang,
                url: {
                    webUrl: req.body.webUrl,
                    gitUrl: req.body.gitUrl,
                },
            };

            await Web.create(webPost)
                .then(async (result) => {
                    if (result) {
                        await User.updateOne(
                            { email },
                            {
                                $push: {
                                    webApp: result._id,
                                },
                            },
                            {
                                new: true,
                            },
                        );

                        res.status(200).send({
                            data: result,
                            message: 'Your web Post create successfully',
                        });
                    } else {
                        res.send({
                            message: 'Data Not Found',
                        });
                    }
                })
                .catch((err) => {
                    res.send({
                        message: err.message,
                    });
                });
        } else {
            res.status(400).send({
                message: 'User Is Not Found',
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
};
