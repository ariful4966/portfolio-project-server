const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.send('Hi I am web application get route')
}

)

module.exports = router;