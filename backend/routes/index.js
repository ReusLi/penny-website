


module.exports = (app) => {
    app.use('/api/test', require("../controller/testCtrl"));

    app.use('/api/pyDiary', require("../controller/pyDiaryCtrl"));
    app.use('/api/pyUser', require("../controller/pyUserCtrl"));

    app.use('/api/pyUpload', require("../controller/pyUploadCtrl"));
    
}