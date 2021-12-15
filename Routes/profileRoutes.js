const { profilePostController, profilePic, profileGetController } = require('../Controllers/profileController');
const { profileCreateValidation, profileCreateValidationHandler } = require('../Middlewares/profileValidation');
const Profile = require('../Models/Profile');

const router = require('express').Router();

router.get('/', profileGetController )

router.post('/create', profileCreateValidation, profileCreateValidationHandler, profilePostController)
router.post('/photo', profilePic)


module.exports = router