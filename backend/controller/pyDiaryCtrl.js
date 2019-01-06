const express = require('express');
const router = express.Router();

const diaryDao = require('../dao/pyDiaryDao')

router.post('/findAll', async (req, res, next) => {
    const diaryList = await diaryDao.findAll();
    res.json(diaryList)
})

router.post('/add', async (req, res, next) => {
    const diaryVO = req.body.diaryVO
    diaryDao.add(diaryVO)
    res.json('OK')
})

module.exports = router;