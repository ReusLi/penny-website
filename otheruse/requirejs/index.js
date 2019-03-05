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
    /**
     * 在所有非用户编写代码后附加注释。
     */
    auxiliaryCommentBefore: '在所有非用户编写代码后附加注释。',
    /**
     * 在所有非用户编写代码前附加注释。
     */
    auxiliaryCommentAfter: '在所有非用户编写代码前附加注释。',
    /**
     * 一个可选的回调，控制是否需要输出注释。
     * 具体调用为 shouldPrintComment(commentContents) 。 
     * 注意: 该选项使用时会覆盖 comment 选项。
     */
    shouldPrintComment: () => { return false },
    /**
     * 是否输出注释
     */
    comments: false,
    /**
     * 不要包含多余的空格符和换行符`.设置为 'auto' 时，当输入大小 > 500KB 时，compact 会被设置为 true.
     */
    compact: false,
    /**
     * 保证输出最小化(不输出代码块最后一个分号，输出文字为字符串而不是转义字符串，安全情况下 new 后的 () 会被去除)
     */
    minified: false,
    /**
     * 设置为true以减少空格（但不像opts.compact那么多）.
     */
    concise: false,
    /**
     * 输出的引号类型
     */
    quotes: 'single',
    /**
     * 在错误信息是使用的文件名等
     */
    filename: 'TTTXXXXX',
    /**
     * 如果为 true, 添加一个 map 属性在输出的返回值中.如果设置为 'inline', 
     * 带有 sourceMappingURL 指令的注释被添加到返回代码的底部.
     * 如果设置为 'both', 则会返回 map 属性并追加 source map 注释.
     * 它不会自己生成 sourcemap 文件
     * 要想让 CLI 生成 sourcemap 
     * 你必须给它传递 --source-maps 选项.
     */
    sourceMaps: false,
    /**
     * 所有 source 都是相对于 root 的.
     */
    sourceRoot: '',
    /**
     * 在返回的 source map 上设置 sources[0]
     */
    sourceFileName,
    /**
     * 设置为true以使用 'json' 运行jsesc: true以打印 '\ u00A9' 与 '©' ;
     */
    jsonCompatibleStrings: false
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