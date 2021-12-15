const { webAppPostController, webAppGetController } = require('../Controllers/webAppController');
const { webAppValidation, webAppValidationHandler } = require('../Middlewares/webAppValdation');

const router = require('express').Router();

router.get('/', webAppGetController)

router.post('/create',webAppValidation, webAppValidationHandler, webAppPostController)

module.exports = router;