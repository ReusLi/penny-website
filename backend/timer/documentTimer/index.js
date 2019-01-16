const path = require('path')

const docUtil = require('./docUtil')

const docDao = require('../../dao/pyDocDao')
/**
 * 1. 用babel遍历前端src, 整理出文档
 * 2. 存入数据库
 */
class DocTimer {
    async run() {
        // 遍历的文件
        const commonpath = '../../../src/components'
        const pathList = [
            path.join(__dirname, commonpath, 'diaryList/index.tsx')
        ]
        // 用babel遍历前端src, 整理出文档
        const docModels = await docUtil.findDocModel(pathList)
        // 存入数据库
        const addResult = docDao.bulkCreate(docModels)
    }

    /**
     * 获取前端代码文件路径
     * 
     * @return {array<string>}
     */
    findFilePaths() {

    }
}

module.exports = new DocTimer()