const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.send('Hi this is page show the moble application')
})

module.exports = router