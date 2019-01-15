const fs = require('fs')
const path = require('path')
const TsParser = require('typescript-parser')
const parser = new TsParser.TypescriptParser();

const outputpath = path.join(__dirname, 'src/diaryList.md')
TsParser.ClassDeclaration

class makeDocuments {
  async do(pathList) {
    for (let i = 0; i < pathList.length; i++) {
      const path = pathList[i];
      const code = fs.readFileSync(path, 'utf-8')
      const ast = await parser.parseSource(code, 4);
      ast.declarations.forEach(declaration => {
        declaration instanceof TsParser.ClassDeclaration
          ? this.makeTable(declaration)
          : null
      })
    }
  }

  makeTable(declaration) {
    let table = []
    const methods = declaration.methods


    methods.forEach(method => {
      table.push({
        name: method.name,
        return: method.type === undefined ? 'void' : this.handleltgt(method.type),
        comment: this.handleComment(method.jsDoc),
        param: this.handleParam(method.parameters)
      })
    })

    this.handleMarkDownCode(table)
  }

  /**
   * 把table内容生成markdown代码
   * @param {array} table 
   * 
   * @return {void}
   */
  handleMarkDownCode(table) {
    let markdown = [
      '函数 | 参数 | 返回值 | 注释',
      ':- | :- | :-: | -:'
    ]

    table.forEach(item => {
      markdown.push(
        `${item.name} | ${item.param} | ${item.return} | ${item.comment.replace(/\r|\n|\s/g, '')}`
      )
    })

    markdown = markdown.join('\n')

    fs.existsSync(outputpath)
      ? fs.unlinkSync(outputpath)
      : null

    fs.writeFileSync(outputpath, markdown, 'utf-8')
  }

  /**
   * 处理注释
   * @param {array} jsDoc 
   * 
   * @return {string}
   */
  handleComment(jsDoc) {
    let commentStr = []
    if (jsDoc.length === 0) {
      return '-'
    }

    jsDoc.forEach(item => {
      commentStr.push(item.comment)
    })

    return commentStr.join('<br>')
  }

  /**
   * 处理参数
   * @param {array} parameters 
   * 
   * @return {string}
   */
  handleParam(parameters) {
    let paramStr = []
    if (parameters.length === 0) {
      return '-'
    }

    parameters.forEach(item => {
      paramStr.push(`${item.name}: ${item.type}`)
    })

    return paramStr.join('<br>')
  }

  handleltgt(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

const commonpath = '../src/components'
const pathList = [
  path.join(__dirname, commonpath, 'diaryList/index.tsx')
]

const cls = new makeDocuments()
cls.do(pathList)