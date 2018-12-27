module.exports = (app) => {
    app.use('/api/test', require("../controller/testCtrl"));
}