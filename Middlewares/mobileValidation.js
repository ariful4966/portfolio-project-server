const { validationResult } = require('express-validator');

module.exports.mobileValidationHandler = (req, res, next) => {
    const errors = validationResult(req);

    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.send({
            error: mappedErrors,
        });
    }
};
