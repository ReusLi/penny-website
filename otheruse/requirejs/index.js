const fs = require('fs')
const path = require('path')

const _ = require('lodash')

const babel = require('babel-core')
const babeltraverse = require('babel-traverse')

const generate = require('babel-generator').default;

// traverse, Visitor
const traverse = babeltraverse.default
const visitors = babeltraverse.visitors

const filePath = path.join(__dirname, 'source', 'test.js')
const fileContent = fs.readFileSync(filePath, 'utf-8')

const opt = {
    auxiliaryCommentBefore:  'auxiliaryCommentBefore',
    auxiliaryCommentAfter: 'auxiliaryCommentAfter',
    // 是否输出注释
    comments: false,
    // 是否压缩代码
    compact: false
}

const visitor1 = {
    ObjectExpression(NodePath, PluginPass) {
        let bindEventValue = null;
        NodePath.node.properties.forEach(propertie => {
            propertie.key.name === 'bindEvent'
                ? bindEventValue = propertie.value
                : null
        });

        // 找到 bindEvent 节点
        if (bindEventValue) {
            const BlockStatementBody = bindEventValue.body.body

            BlockStatementBody.forEach(node => {
                const { map, code } = generate(node, opt)
                console.log(code)
            });
        }
    }
}



const astNode = babel.transform(fileContent, {
    plugins: [{
        visitor: visitor1
    }]
})