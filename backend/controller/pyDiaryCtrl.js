const express = require('express');
const router = express.Router();

const diaryDao = require('../dao/pyDiaryDao')

router.post('/findAll', async (req, res, next) => {
    const diaryList = await diaryDao.findByCondition(req.body.condition)
    res.json(diaryList)
})

router.post('/add', async (req, res, next) => {
    const diaryVO = req.body.diaryVO
    const result = await diaryDao.doAdd(diaryVO)
    res.json(result)
})

router.post('/delete', async (req, res, next) => {
    const id = req.body.id
    const result = await diaryDao.delete(id)
    res.json(result)
})

router.post('/update', async (req, res, next) => {
    const diaryVO = req.body.diaryVO
    const result = await diaryDao.update(diaryVO)
    res.json(result)
})

router.post('/findDiaryRecord', async (req, res, next) => {
    const sql = `SELECT DATE_FORMAT (createTime, '%Y-%m-%d') AS date FROM py_diary WHERE userId = 'penny' GROUP BY DATE_FORMAT (createTime, '%Y-%m-%d')`;
    const result = await diaryDao.doQuery(sql, [], 0)
    res.json(result)
})

module.exports = router;