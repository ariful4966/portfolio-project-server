const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.send('See Your Profile information')
})



module.exports = router