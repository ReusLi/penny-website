const express = require('express');
const router = express.Router();

router.get('/testGet', (req, res, next) => {
    const result = 'get is success!!!'
    res.json(result)
})

router.post('/testPost', async (req, res, next) => {
    const result = 'post is success!!!'
    res.json(result)
})

module.exports = router;