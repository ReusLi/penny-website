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
    CallExpression(NodePath, PluginPass) {
        console.log(...arguments)

        // #btn_1
        NodePath.node.callee.object.arguments[0].value
        debugger
    }
}

const visitor2 = {
    IfStatement: {
        enter(a, b, c) {
            console.log('enter---')
        },
        exit() {
            console.log('---exit')
        }
    }
}

const astNode = babel.transform(fileContent, {
    plugins: [{
        visitor: visitor1
    }, {
        visitor: visitor2
    }]
})


// traverse(astNode.ast, {
//     enter(path) {
//         if (path.isExpressionStatement()) {
//             console.log(path.node.start)
//         }
//         if (path.isIdentifier({ name: 'test' })) {
//             console.dir(path.node)
//         }
//         if (path.isFunction()) {
//             console.dir(path.node)
//         }
//     }
// })
