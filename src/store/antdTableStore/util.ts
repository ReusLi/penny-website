import { CellKey, AntdColumn } from 'interface/common'

import { toJS } from 'mobx';

class Util {
    /**
     * 同步更新antd的table columns属性
     * 会把用户操作后的表格
     * 经过数据结构的转换
     * 变成antd table columns的数据结构
     * 
     * @param cellModels 会把用户操作后的表格数据结构
     * 
     * @return  {antd table columns}
     */
    syncTableColumns(cellModels: Array<Array<CellKey>>) {
        // 把mobx数据变成可操作数据
        cellModels = toJS(cellModels)

        // 补充CellKey -> AntdColumn需要的属性
        cellModels = this.initColumnInfo(cellModels)

        let columns: Array<any> = cellModels.shift().filter(cell => !cell.isHide)

        columns = columns.map(col => {
            col = this.findChildren(cellModels, col, 0)
            return col
        })
        columns = this.filterColumnsAttr(columns)
        return columns
    }

    /**
     * 过滤掉一些无用的属性
     * 最后是一个pure的表格columns结构
     * 
     * @param columns antd table columns
     * 
     * @returns {columns}
     */
    filterColumnsAttr(columns: Array<any>) {
        const tmp = {
            children: columns
        }
        // 删掉无用的属性
        // rowspan不能删除 这是antd(rc-table)的bug
        // colspan 为1的时候需要删掉, 也是antd(rc-table)的bug
        this.mapColums(tmp, (col: any) => {
            col.colSpan === 1
                ? delete col.colSpan
                : null
            delete col.X
            delete col.Y
            delete col.text
            delete col.isHide
            delete col.hasParent
        })
        return columns
    }

    /**
     * 补充
     * CellKey -> AntdColumn需要的属性:
     * 
     * @param cellModels 
     * 
     * @return {cellModels}
     */
    initColumnInfo(cellModels: Array<Array<AntdColumn>>) {
        cellModels.map(row => {
            row.map(cell => {
                cell.children = []
                cell.hasParent = false
                cell.title = cell.text
                cell.key = `${cell.X}_${cell.Y}`
            })
        })
        return cellModels
    }

    /**
     * 搜索表格列的children
     * 如一个3行3列的表格: 
     * [
     *      [{1}, {2}, {3}]
     *      [{4}, {5}, {6}]
     *      [{7}, {8}, {9}]
     * ]
     * 
     * @param cellModels 
     * 指除去 [{1}, {2}, {3}] 以外的数组数据
     * 因为 [{1}, {2}, {3}] 在andt的数据结构中是固定的父节点
     * 所以递归只需要在 [{1}, {2}, {3}] 以外的数据里面找children
     * 
     * @param col 指数据第一行的每一个元素, 这里分别为 {1}, {2}, {3}
     * 
     * @param rowIndex rowIndex指递归行数
     * 
     * @return {andt table columns}
     * 最后返回的是一个跟antd表格column属性一样的数据结构
     */
    findChildren(cellModels: Array<Array<AntdColumn>>, col: any, rowIndex: number) {
        if (cellModels.length <= rowIndex)
            return false
        const curRow = cellModels[rowIndex]

        curRow.map(cell => {
            if (!cell.isHide) {
                const minY = col.Y,
                    maxY = col.Y + (col.colSpan - 1);

                if (cell.hasParent === false && minY <= cell.Y && cell.Y <= maxY) {
                    col.children.push(cell)
                    cell.hasParent = true
                    this.findChildren(cellModels, cell, ++rowIndex)
                }
            }
        })
        return col
    }

    /**
     * 遍历columns的数据结构
     * @param columns 
     * @param callback 
     */
    mapColums(columns: any, callback: Function) {
        const children: Array<any> = columns.children

        if (!children)
            return false

        children.map(col => {
            callback(col)
            if (col.children)
                this.mapColums(col.children, callback)
        })
    }
}

export default new Util()