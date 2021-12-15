const { check, validationResult } = require('express-validator');

const webAppValidation = [
    check('title').isLength({ max: 200 }).withMessage('Your Title is too long'),
    check('body')
        .isLength({ min: 3, max: 5000 })
        .withMessage('Your description is more then 3 char and less then 5000 char'),
];

const webAppValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();

    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.status(400).send({
            error: mappedError,
        });
    }
};

module.exports = {
    webAppValidation,
    webAppValidationHandler,
};
