const express = require('express');
const router = express.Router();

const uploadUtil = require('../context/pyUploadContext');

router.post('/upload', async (req, res, next) => {
    uploadUtil.fileHandler()(req, res, next);
})

module.exports = router;