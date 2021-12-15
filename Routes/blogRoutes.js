const { blogGetController, blogPostController, blogUpdateControl, blogDeleteController } = require('../Controllers/blogController');
const { blogValidationHandler } = require('../Middlewares/blogValidation');
const { webAppValidation } = require('../Middlewares/webAppValdation');

const router = require('express').Router();


router.get('/', blogGetController)

router.post('/create', webAppValidation, blogValidationHandler, blogPostController)

router.patch('/:id', blogUpdateControl);


router.delete('/:id', blogDeleteController)

module.exports = router;