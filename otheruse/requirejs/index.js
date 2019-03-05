const fs = require('fs')
const path = require('path')

const babel = require('babel-core')
const babeltraverse = require('babel-traverse')

// traverse, Visitor
const traverse = babeltraverse.default
const visitors = babeltraverse.visitors

const filePath = path.join(__dirname, 'source', 'test.js')
const fileContent = fs.readFileSync(filePath, 'utf-8')


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
                console.log(node)

                node.expression
            });

            debugger
        }
    }
}

const astNode = babel.transform(fileContent, {
    plugins: [{
        visitor: visitor1
    }]
})