const fs = require('fs')
const path = require('path')

const babel = require('babel-core')
const babeltraverse = require('babel-traverse')

// traverse, Visitor
const traverse = babeltraverse.default
const visitors = babeltraverse.visitors

const filePath = path.join(__dirname, 'source', 'test.js')
const fileContent = fs.readFileSync(filePath, 'utf-8')

const astNode = babel.transform(fileContent)

traverse(astNode.ast, {
    enter(path) {
        if (path.isExpressionStatement()) {
            console.log(path.node.start)
        }
        if (path.isIdentifier({ name: 'test' })) {
            console.dir(path.node)
        }
        if (path.isFunction()) {
            console.dir(path.node)
        }
    }
})