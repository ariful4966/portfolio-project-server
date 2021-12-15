const User = require("../Models/User");

const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signupHandler, loginHandler } = require("../Controllers/userController");
const { loginValidators, loginValidationHandler } = require("../Middlewares/loginValidation");
const { signupValidator, signupValidationHandler } = require("../Middlewares/signupValidation");

router.get("/", (req, res, next) => {
  res.send("Hi This is user get router");
});

router.post('/login', loginValidators, loginValidationHandler, loginHandler)

router.post("/signup", signupValidator, signupValidationHandler, signupHandler);

module.exports = router;
