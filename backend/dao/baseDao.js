const { sequelize } = require('../config/dbConfig');

/**
 * 基础DAO.
 * @param {模型名称} modelName 
 */
const BaseDao = function (modelName) {
    const entityObj = sequelize.import(`../models/entity/${modelName}`);

    class dao extends entityObj {
        constructor() {
            super()
        }
        find(limit, offset) {
            return new Promise(function (resolve, reject) {
                entityObj.findAll({
                    limit: parseInt(limit) || 10, //默认查询10条
                    offset: parseInt(offset) || 0 //默认查询第一页
                }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                })
            }
            )
        }

        findByCondition(condition, order) {
            return new Promise(function (resolve, reject) {
                entityObj.findAll(condition, null, { raw: true }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                })
            })
        }

        findById(id, callback) {
            return new Promise(function (resolve, reject) {
                entityObj.findById(id).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                })
            })
        }
        create(entity, callback) {
            return new Promise(function (resolve, reject) {
                entityObj.create(entity).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                })
            })
        }
        update(entity) {
            return new Promise(function (resolve, reject) {
                entityObj.update(entity, { where: { id: entity.id } }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                })
            })
        }
        delete(id) {
            return new Promise(function (resolve, reject) {
                entityObj.destroy({ where: { id: id } }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                })
            })
        }
        /**
         * 获得查询类型，用于自定义SQL
         * 通过query方法可以传入增、删、改sql
         * @param {Number} queryType
         */
        getQeuryType(type) {
            const queryType = '';
            switch (type) {
                case 0: queryType = sequelize.QueryTypes.SELECT; break; //查询
                case 1: queryType = sequelize.QueryTypes.INSERT; break; //新增
                case 2: queryType = sequelize.QueryTypes.UPDATE; break; //修改
                case 3: queryType = sequelize.QueryTypes.DELETE; break; //删除
                case 4: queryType = sequelize.QueryTypes.SHOWTABLES; break; //显示表
                case 5: queryType = sequelize.QueryTypes.SHOWINDEXES; break; //显示索引
                case 6: queryType = sequelize.QueryTypes.BULKUPDATE; break;
                case 7: queryType = sequelize.QueryTypes.BULKDELETE; break;
                default: queryType = sequelize.QueryTypes.SELECT; break; //查询
            }
            return queryType;
        }
        /**
         * 执行查询，也可以执行自定义sql
         * @param {String} sql 
         * @param {Array} params 查询参数
         * @param {Number} queryType 查询类型，0:SELECT、1:INSERT、2:UPDATE、3:DELETE等
         */
        doQuery(sql, params, queryType) {
            const type = this.getQeuryType(queryType);
            return new Promise(function (resolve, reject) {
                sequelize.query(
                    sql, {
                        replacements: params, type: type
                    }).then(function (result) {
                        resolve(result);
                    }).catch(function (error) {
                        reject(error);
                    })
            })
        }
        /**
         * 执行新增回调.
         */
        doAdd(entity) {
            return new Promise(function (resolve, reject) {
                entityObj.create(entity).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                })
            })
        }
        /**
         * 执行删除回调.
         */
        doDelete(condition) {
            return new Promise(function (resolve, reject) {
                entityObj.destroy({ where: condition }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                })
            })
        }
        /**
         * 执行更新回调.
         */
        doUpdate(entity, condition) {
            return new Promise(function (resolve, reject) {
                entityObj.update(entity, { 'where': condition }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error.stack);
                })
            })
        }
    }

    return dao;
}

module.exports = function (modelName) {
    const a = new BaseDao(modelName);
    return a
}

