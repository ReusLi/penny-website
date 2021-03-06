const { sequelize } = require('../config/dbConfig');
const logger = require('../config/log');

logger.info('初始化数据表结构相关......');

sequelize.import('./entity/py_user');
sequelize.import('./entity/py_diary');
sequelize.import('./entity/py_doc');

logger.info('同步表结构......');
// 同步表结构
sequelize.sync({
    alter: true,
    force: false
})
