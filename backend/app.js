const express = require('express');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/index');
const config = require('./config/config');
const logger = require('./config/log');

const app = express();
const compression = require('compression');

const timer = require('./timer')

//增加压缩缓存gzip
app.use(compression());

process.env.UV_THREADPOOL_SIZE = 100;

//统一异常处理.
process.on('uncaughtException', function(err){
    logger.error(err);
})

// 设置请求数据大小
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//加载环境变量
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

logger.info("服务启动开始……");

// 数据库
require('./models/index');

//加载路由
logger.info("初始化路由……");

mainRoutes(app);

//自己的处理错误的逻辑
app.use(function (err, req, res, next) {
    if (err) {
        logger.error(err.stack);
    }
});


logger.info("服务启动成功……,端口号为:" + config.serverPort);

logger.info('启动定时任务');

setTimeout(() => {
    timer.runAllTimer();
}, 3000)

module.exports = app;