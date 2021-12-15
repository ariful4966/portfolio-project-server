const { mobileAppPostController, moboieAppGetController } = require('../Controllers/mobileAppController');
const { mobileValidationHandler } = require('../Middlewares/mobileValidation');
const { webAppValidation } = require('../Middlewares/webAppValdation');

const router = require('express').Router();

router.get('/', moboieAppGetController);

router.post('/create', webAppValidation, mobileValidationHandler, mobileAppPostController)

module.exports = router