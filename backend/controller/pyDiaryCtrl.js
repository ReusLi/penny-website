const express = require('express');
const router = express.Router();

const diaryDao = require('../dao/pyDiaryDao')

router.post('/findAll', async (req, res, next) => {
    const diaryList = await diaryDao.find();
    res.json(diaryList)
})

router.post('/add', async (req, res, next) => {
    const diaryVO = req.body.diaryVO
    diaryDao.doAdd(diaryVO)
    res.json('OK')
})

module.exports = router;