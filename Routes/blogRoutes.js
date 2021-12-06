const { blogGetController, blogPostController, blogUpdateControl, blogDeleteController } = require('../Controller/blogController');

const router = require('express').Router();


router.get('/', blogGetController)

router.post('/', blogPostController)

router.patch('/:id', blogUpdateControl);


router.delete('/:id', blogDeleteController)

module.exports = router;