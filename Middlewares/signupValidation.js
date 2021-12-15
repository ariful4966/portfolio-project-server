const { validationResult, check } = require('express-validator');

const signupValidator = [
    check('name').isLength({ min: 3 }).withMessage('Name is minimum length 3 word'),

    check('email').isEmail().withMessage("It's a not email"),
    check('password').isLength({ min: 5 }).withMessage('Password is minimum length 5 charecter'),
];

const signupValidationHandler = (req, res, next) => {
    const errors = validationResult(req);

    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(400).send({
            errors: mappedErrors,
        });
    }
};

module.exports = {
    signupValidator,
    signupValidationHandler,
};
