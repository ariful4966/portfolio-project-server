const { validationResult, check } = require('express-validator');

const loginValidators = [
    check('email').isEmail().withMessage(" It's a not valid email"),
    check('password').isLength({ min: 3 }).withMessage('Password is too short'),
];

const loginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);

    const mappedError = errors.mapped();

    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.status(400).send({
            errors: mappedError,
        });
    }
};

module.exports = {
    loginValidators,
    loginValidationHandler,
};
