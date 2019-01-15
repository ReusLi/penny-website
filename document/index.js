const fs = require('fs')
const path = require('path')
const tsparser = require('typescript-parser')
const parser = new tsparser.TypescriptParser();

const filepath = path.join(__dirname, '../src/components/diaryList/index.tsx')
const code = fs.readFileSync(filepath, 'utf-8')

(async() => {
  const result = await parser.parseSource(code, 4);
  return result
})()