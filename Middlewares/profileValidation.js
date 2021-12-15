const { check, validationResult } = require('express-validator');

const profileCreateValidation = [
    check('name').isLength({ min: 3 }).withMessage('Your name is too short'),
    check('email').isEmail().withMessage('Your Email Have not valide'),
    check('phone')
        .isMobilePhone('bn-BD', {
            strictMode: true,
        })
        .withMessage('Your Mobile number is add country code +880'),
    check('title').isLength({ min: 2 }).withMessage('You can not sent title'),
    check('bio').isString().withMessage("It's is not a String"),
    check('village').isString().withMessage("It's Not a string"),
    check('upozila').isString().withMessage("It's Not a string"),
    check('division').isString().withMessage("It's Not a string"),
    check('country').isString().withMessage("It's Not a string"),
    check('web_url').isString().withMessage("It's not a URL"),
    check('git_url').isString().withMessage("It's not a URL"),
    check('fb_url').isString().withMessage("It's not a URL"),
    check('ld_url').isString().withMessage("It's not a URL"),
];

const profileCreateValidationHandler = (req, res, next) => {
    const errors = validationResult(req);

    const mappadError = errors.mapped();

    if (Object.keys(mappadError).length === 0) {
        next();
    } else {
        res.status(400).send({
            error: mappadError,
        });
    }
};

module.exports = {
    profileCreateValidation,
    profileCreateValidationHandler,
};
