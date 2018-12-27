const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const logger = require('../config/log');

module.exports = function (app) {
    // 设置请求数据大小
    app.use(express.json({ limit: '50mb', extended: true }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({ limit: '50mb', extended: true }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    //视图引擎设置
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'html');
    //设置网页图标
    app.use(favicon(path.join(__dirname, '../views/themes/favicon.ico')));
    //加载环境变量
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    //统一异常处理.
    process.on('uncaughtException', function (err) {
        if (app.get('env') === 'development') {
            logger.error(err);
        }
    })
}