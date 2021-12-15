const { validationResult } = require('express-validator');

module.exports.blogValidationHandler = (req, res, next) => {
    const errors = validationResult(req);

    const mappedError = errors.mapped();

    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.send({
            error: mappedError,
        });
    }
};
