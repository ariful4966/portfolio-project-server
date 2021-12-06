const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.send('Hi This is user get router')
})


module.exports = router;