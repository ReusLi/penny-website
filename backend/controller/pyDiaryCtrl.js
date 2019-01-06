const express = require('express');
const router = express.Router();

const diaryDao = require('../dao/pyDiaryDao')

router.post('/add', async (req, res, next) => {
    const diaryVo = req.body.diaryVo
    diaryDao.add(diaryVo)
    res.json('OK')
})

module.exports = router;