require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const signupHandler = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            const hashPassword = await bcrypt.hash(req.body.password, 10);

            const user = {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                role: 'user',
            };

            if(user.email === 'ariful4966'){
                await User.create(user)
                .then((doc) => {
                    res.status(200).send({
                        data: doc,
                        message: 'Sign Up Successfully',
                    });
                })
                .catch((err) => {
                    res.send({ error: err.message });
                });
            }else{
                res.send({
                    error: 'Sorry Admin is not permit your account'
                })
            }
        } else {
            res.status(302).send({ error: 'Already have an account' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const loginHandler = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);

            if (isValidPassword) {
                const userObj = {
                    name: user.name,
                    email: user.email,
                };
                const token = jwt.sign(userObj, process.env.JWT_SECRETE, {
                    expiresIn: '2 days',
                });
                res.status(200).send({
                    accesss_token: token,
                    message: 'Login Successfully',
                });
            } else {
                res.states(401).send({ error: 'Authentication Faild!' });
            }
        } else {
            res.status(401).send({
                error: 'Authentication Faild!',
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
};

module.exports = {
    signupHandler,
    loginHandler,
};
