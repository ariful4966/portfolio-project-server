const decode = require('jwt-decode');
const Mobile = require('../Models/Mobile');
const User = require('../Models/User');

module.exports.moboieAppGetController = async (req, res) => {
    try {
        await Mobile.find({})
            .then((result) => {
                res.send({
                    message: 'Mobile App Data Get Successfully',
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

module.exports.mobileAppPostController = async (req, res) => {
    try {
        const token = req.headers.accesstoken;

        const { email } = decode(token);

        const extUser = await User.findOne({ email });

        if (extUser) {
            const mobliePost = {
                title: req.body.title,
                body: req.body.body,
                author: extUser._id,
                language: req.body.lang,
                image: {
                    display_url: req.body.image.display_url,
                    delete_url: req.body.image.delete_url,
                },
                url: {
                    mobileUrl: req.body.webUrl,
                    gitUrl: req.body.gitUrl,
                },
            };

            await Mobile.create(mobliePost)
                .then(async (result) => {
                    if (result) {
                        await User.updateOne(
                            { email },
                            {
                                $push: {
                                    mobile: result._id,
                                },
                            },
                            {
                                new: true,
                            },
                        );

                        res.status(200).send({
                            data: result,
                            message: 'Your mobile Post create successfully',
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
