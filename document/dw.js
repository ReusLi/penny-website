const fs = require('fs')
const path = require('path')

const outputpath = path.join(__dirname, 'json')

let dwSql = `INSERT IGNORE INTO \`ucSQDWXX\` VALUES ('@DWID', 'T_@RANG', '开发_@RANG', '{\\"province\\":\\"广东省\\",\\"city\\":\\"肇庆市\\",\\"street\\":\\"德庆县\\",\\"district\\":\\"德城街道\\",\\"detail\\":\\"221B号\\"}', '潘', '653101199501230025', '13750061249', NULL, NULL, '应', '653101199501230021', '13750061249', NULL, NULL, '潘', '653101199501230025', '13750061249', NULL, NULL, 1558618464783, 'upp11001', 0, '44000000', '44008000');`

let csSql = `INSERT IGNORE INTO \`ucSQCSXX\` VALUES ('63432885750@CSID', '02', NULL, 101, '101', '1', '20', 101, '101大厦', 101, '101', 101, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, '其他措施AAA', 1, 1, NULL, '2', '101', '02', '101', '101', '101', '101', '101', '@DWID', '2019-05-23 17:48:34', 0, '1', NULL, NULL, '看看');`

const len = 40 * 10000

let dwResult = [],
    csResult = [];

let DWID = 500001;
let RANG = 900000000000001;
let CSID = 8929598;

let replaceDw = replaceCs = ''

for (let i = 1; i <= len; i++) {
    replaceDw = dwSql.replace(/@DWID/, DWID).replace(/@RANG/g, RANG)

    replaceCs = csSql.replace(/@DWID/, DWID).replace(/@CSID/, CSID)

    dwResult.push(replaceDw)
    csResult.push(replaceCs)

    DWID += 1;
    RANG += 1;
    CSID += 1;
}

const files = fs.readdirSync(outputpath)

files.forEach(fileName => {
    fs.unlinkSync(path.join(outputpath, fileName))
})

let dwFileContent = csFileContent = '';


let index = 0

for (index = 0; index < 100000; index++) {
    dwFileContent += dwResult[index] + '\n';
    csFileContent += csResult[index] + '\n';
}
fs.writeFileSync(path.join(outputpath, 'dw_1.json'), dwFileContent, 'utf-8')
fs.writeFileSync(path.join(outputpath, 'cs_1.json'), csFileContent, 'utf-8')
dwFileContent = csFileContent = '';

for (index = 100000; index < 200000; index++) {
    dwFileContent += dwResult[index] + '\n';
    csFileContent += csResult[index] + '\n';
}
fs.writeFileSync(path.join(outputpath, 'dw_2.json'), dwFileContent, 'utf-8')
fs.writeFileSync(path.join(outputpath, 'cs_2.json'), csFileContent, 'utf-8')
dwFileContent = csFileContent = '';

for (index = 200000; index < 300000; index++) {
    dwFileContent += dwResult[index] + '\n';
    csFileContent += csResult[index] + '\n';
}
fs.writeFileSync(path.join(outputpath, 'dw_3.json'), dwFileContent, 'utf-8')
fs.writeFileSync(path.join(outputpath, 'cs_3.json'), csFileContent, 'utf-8')
dwFileContent = csFileContent = '';

for (index = 300000; index < 400000; index++) {
    dwFileContent += dwResult[index] + '\n';
    csFileContent += csResult[index] + '\n';
}
fs.writeFileSync(path.join(outputpath, 'dw_4.json'), dwFileContent, 'utf-8')
fs.writeFileSync(path.join(outputpath, 'cs_4.json'), csFileContent, 'utf-8')
dwFileContent = csFileContent = '';