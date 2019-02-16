const fs = require('fs')
const path = require('path')
const TsParser = require('typescript-parser')
const TsParser2 = require('typescript')
const parser = new TsParser.TypescriptParser();
const uuid = require('uuid')

const { aliasCom, aliasProps, aliasDataType, aliasDataTypeEnglish } = require('./aliasCom')

// 控件数据结构
let components = {}

// 控件名称翻译
let COM_NAME_FANYI = []

// 控件属性翻译名称
let COM_PROP_FANYI = []

// 还没有收集完的枚举值
let STILL_NO_COLLECT_ENUM = []

// 过滤重复的枚举值
let STILL_NO_COLLECT_ENUM_FILTER = []

class makeDocuments {
    async do(pathList) {
        await this.makeControlProperities(pathList)
        await this.makeControlList(components)
    }
    makeControlProperities(pathList) {
        return new Promise(async resolve => {
            for (let i = 0; i < pathList.length; i++) {
                const path = pathList[i];
                const code = fs.readFileSync(path, 'utf-8')
                const ast = await parser.parseSource(code, 3);

                const ast2 = await parser.parseFile('elementDoc/element-ui/types/alert.d.ts', __dirname)
                ast.declarations.forEach(declaration => {
                    declaration instanceof TsParser.ClassDeclaration
                        ? this.makeProps(declaration)
                        : null
                })
            }

            STILL_NO_COLLECT_ENUM.map((item, index) => {
                if (STILL_NO_COLLECT_ENUM.indexOf(item) !== STILL_NO_COLLECT_ENUM.lastIndexOf(item) && STILL_NO_COLLECT_ENUM.indexOf(item) === index) {
                    STILL_NO_COLLECT_ENUM_FILTER.push(item)
                }
                if (STILL_NO_COLLECT_ENUM.indexOf(item) === STILL_NO_COLLECT_ENUM.lastIndexOf(item)) {
                    STILL_NO_COLLECT_ENUM_FILTER.push(item)
                }
            })

            this.makeEnumData(components)

            const filePath = path.join(__dirname, 'controlProperities.json')
            this.writeFileSync(filePath, JSON.stringify(components, null, 4))
            resolve(true)
        })
    }

    makeProps(declaration) {
        let com = declaration.name.toLowerCase()
        if (com.indexOf('el') === 0) {
            com = com.replace(/el/g, 'el-')
        } else {
            com = `el-${com}`
        }

        const comName = com.replace(/el-/g, '')

        COM_NAME_FANYI.push(comName)

        components[com] = {
            caption: aliasCom[comName],
            html: `<${com}></${com}>`,
            option: []
        }

        const dataType = ['date', 'string', 'number', 'boolean']
        const dataArrType = ['string[]', 'number[]']

        declaration.properties.forEach((props, index) => {
            if (props.type.indexOf('=>') === -1) {
                // 记录需要翻译的名字
                COM_PROP_FANYI.push(props.name)

                // 如果是['boolean', 'string', 'number']之一
                if (!dataType.includes(props.type) && !dataArrType.includes(props.type)) {
                    STILL_NO_COLLECT_ENUM.push(props.type)
                }



                if (props.type.indexOf('|') !== -1) {
                    const typeList = props.type.split('|').map(type => type.split(' ').join('').toLowerCase())

                    let hasCoverType = true;

                    typeList.includes('date')
                        ? props.type = 'date'
                        : typeList.includes('string')
                            ? props.type = 'string'
                            : typeList.includes('number')
                                ? props.type = 'number'
                                : typeList.includes('boolean')
                                    ? props.type = 'boolean'
                                    : hasCoverType = false;

                    dataType.includes(props.type) && hasCoverType
                        ? STILL_NO_COLLECT_ENUM.pop()
                        : null
                }

                if (dataArrType.includes(props.type)) {
                    props.type = props.type.split('[]').join('')
                }

                components[com].option.push({
                    name: props.name,
                    caption: aliasProps[props.name],
                    dataType: props.type,
                    synattr: "0",
                    data: [],
                    propSort: index,
                    propDefaultValue: "空",
                    propOftenUse: 1,
                    propIsMeasurement: 0,
                    propIsShow: 1
                })
            }
        })
    }

    makeEnumData(components) {
        Object.keys(components).forEach(key => {
            let item = components[key]
            if (item.option.length) {
                item.option = item.option.map(opt => {

                    if (optList.includes(opt.dataType)) {
                        if (aliasDataType[opt.dataType] === 'nothing') {
                            opt.dataType = 'null'
                        } else {
                            // 变成枚举
                            opt.data = aliasDataType[opt.dataType]
                            opt.dataType = 'enum'
                        }
                    }
                    return opt
                })
            }
        })
    }

    /**
     * 构建control.json
     * @param {object} components 
     */
    makeControlList(components) {
        return new Promise(resolve => {
            let control = []
            Object.keys(components).forEach((key, index) => {
                const item = components[key]

                control.push({
                    "caption": item.caption,
                    "id": uuid.v4(),
                    "name": key,
                    "container": [
                        "ecp-col",
                        "ecp-rect"
                    ],
                    "layout_type": "component",
                    "design_placeholder": `<${key}></${key}>`,
                    "runtime_placeholder": "",
                    "local_template_js": "",
                    "local_template_css": "",
                    "extend_info": "{}",
                    "dev_doc_id": "",
                    "icon": "p-text.png",
                    "imgSrc": null,
                    "visible": 1,
                    "init_col_num": 1,
                    "SORT": index,
                    "bigImg": null,
                    "version": 0
                })
            })

            const filePath = path.join(__dirname, 'control.json')
            this.writeFileSync(filePath, JSON.stringify(control, null, 4))
            resolve(true)
        })
    }

    writeFileSync(filePath, source) {
        fs.existsSync(filePath)
            ? fs.unlinkSync(filePath)
            : null

        fs.writeFileSync(filePath, source, 'utf-8')
    }
}

const optList = Object.keys(aliasDataType)

const elementTypeDir = path.join(__dirname, 'element-ui/types')

let dirList = fs.readdirSync(elementTypeDir, 'utf-8')

const filterFile = ['index.d.ts', 'element-ui.d.ts', 'component.d.ts']

dirList = dirList.filter(file => !filterFile.includes(file))
    .map(file => path.join(elementTypeDir, file))

const cls = new makeDocuments()
cls.do(dirList)