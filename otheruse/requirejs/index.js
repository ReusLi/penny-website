const fs = require('fs')
const path = require('path')

const babel = require('babel-core')

const filePath = path.join(__dirname, 'source', 'test.js')
const fileContent = fs.readFileSync(filePath, 'utf-8')

const astNode = babel.transform(fileContent)


debugger