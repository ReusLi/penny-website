import { CellKey, SelectInfo } from 'interface/common'

// matrixStore mobx
import matrixStore from 'store/matrix/matrixStore';
import Cell from 'components/cell/cell';

class clipboard {
    /**
     * 复制的内容
     */
    private pasteData: Array<Array<string>>

    /**
     * 监听ctrl + v事件
     * @param dom 需要监听paste事件的dom
     */
    bindClipEvent(dom: HTMLElement) {
        if (!dom)
            return false
        dom.addEventListener('paste', (event: any) => {
            // 获取剪切的数据
            const data = this.getPasteData(event.clipboardData.getData('text'))

            // 正确过滤出n*n数组
            this.pasteData = this.filterPasteData(data)

            // 把n*n数组转化为矩阵模型
            let cellModels = this.makeMatrix(this.pasteData)

            cellModels = this.resetSpan(cellModels)

            // 更新矩阵模型
            matrixStore.setCellModels(cellModels)

            // 阻止paste事件
            event.preventDefault()
        })
    }

    /**
     * 获取paste事件中剪切板的值
     * @param pasteStr 剪切板的内容
     * @return 剪切板的值(数组形式)
     */
    getPasteData(pasteStr: string) {
        let data: Array<string>,
            pasteData: Array<Array<string>>;

        data = pasteStr.split('\n')
        pasteData = data.map((item: string) => {
            return item.split(/\s+/)
        })
        return pasteData
    }

    /**
     * 过滤paste操作后的数据
     * 因为paste后正则得出的数据并不是规则的 n*n 数组
     * 规则: 
     * 1. 如果pasteData最后一个是一个 [""] 的数组, 把它删掉
     * 2. 如果剩下的数组长度都一样, 且每个数组最后一个元素都是'', 则统一 pop() 一位
     * 3. 如果剩下的数组长度不一, 把最长的数组 pop() 一位
     * 
     * @param pasteData 
     * 
     * @return 一个规则的 n*n 数组 代表paste数据
     */
    filterPasteData(pasteData: Array<Array<string>>) {
        const lastElement = pasteData.pop()

        // 规则1.
        if (lastElement.length === 1 && lastElement[0] === '') {
            // nothing
        } else {
            pasteData.push(lastElement)
        }

        // n*n 数组的第一个元素长度
        const firstElementLen = pasteData[0].length
        // 是不是每一个数组的length都相等
        const isEveryLenEqual = pasteData.every(element => element.length === firstElementLen)

        // 规则2.
        if (isEveryLenEqual) {
            // 每个数组最后一个元素都是'', 则统一 pop() 一位
            const lastElementIsEmptyStr = pasteData.every(element => {
                return element[firstElementLen - 1] === ''
            })
            if (lastElementIsEmptyStr) {
                pasteData = pasteData.map(element => {
                    element.pop()
                    return element
                })
            }
        }
        // 规则3.
        else {
            let maxLenIndex = -1,
                targetIndex = 0;
            pasteData.map((element, index) => {
                if (element.length > maxLenIndex) {
                    maxLenIndex = element.length
                    targetIndex = index
                }
            })

            pasteData[targetIndex].pop()
        }

        return pasteData
    }

    /**
     * 把过滤后的剪切板值, 变成矩阵cellModels的数据结构
     * @param pasteData 剪切板的值(数组形式)
     * 
     * @return cellModels矩阵模型
     */
    makeMatrix(pasteData: Array<Array<string>>) {
        let cellModels: Array<Array<CellKey>> = [],
            row: Array<CellKey> = [];
        pasteData.forEach((rowItem, rowIndex) => {
            row = []
            rowItem.forEach((element, index) => {
                row.push({
                    X: rowIndex,
                    Y: index,
                    colSpan: 1,
                    rowSpan: 1,
                    text: element,
                    isHide: element === '' ? true : false
                })
            })
            cellModels.push(row)
        })
        return cellModels;
    }

    /**
     * 重新设置colSpan, rowSpan等信息
     * 规则:
     * 1. 优先设置上方cell的rowSpan + 1
     * 2. 如果上方cell.isHide = true, 才考虑左侧cell的colSpan + 1
     * 3. 如果没有上方cell, 考虑左侧cell的colSpan + 1
     * 
     * @param cellModels 
     * 
     * @return cellModels
     */
    resetSpan(cellModels: Array<Array<CellKey>>) {
        cellModels.forEach((rowItem, X) => {
            rowItem.forEach((element, Y) => {
                if (X === 0 && Y === 0) {
                    // nothing
                }
                else if (element.isHide) {
                    // 规则3.
                    if (X === 0) {
                        this.setColSpan(cellModels, element)
                    }
                    // 规则2.
                    else if (this.isAllHideOfTop(cellModels, element)) {
                        this.setColSpan(cellModels, element)
                    }
                    // 规则1.
                    else if (!this.isAllHideOfTop(cellModels, element)) {
                        this.setRowSpan(cellModels, element)
                    }
                }
            })
        })
        return cellModels
    }
    /**
     * 找到左侧距离最近的isHide = false的cell, 并使cell.colSpan + 1
     * @param cellModels 
     * @param cell 
     */
    setColSpan(cellModels: Array<Array<CellKey>>, cell: CellKey) {
        // 第一列的cell和isHide !== true的视为不满足条件, 不往下执行
        if (cell.Y === 0 || cell.isHide !== true) {
            return false;
        }

        let X = cell.X,
            Y = cell.Y - 1,
            stop = false;

        while(Y !== -1 && stop === false) {
            let targetCell = cellModels[X][Y]

            if (targetCell.isHide === false) {
                targetCell.colSpan += 1
                stop = true
            } else {
                Y -= 1
            }
        }
    }
    /**
     * 找到上方距离最近的isHide = false的cell, 并使cell.rowSpan + 1
     * @param cellModels 
     * @param cell 
     */
    setRowSpan(cellModels: Array<Array<CellKey>>, cell: CellKey) {
        // 第一行的cell和isHide !== true的视为不满足条件, 不往下执行
        if (cell.X === 0 || cell.isHide !== true) {
            return false;
        }

        let X = cell.X - 1,
            Y = cell.Y,
            stop = false;

        while(X !== -1 && stop === false) {
            let targetCell = cellModels[X][Y]

            if (targetCell.isHide === false) {
                targetCell.rowSpan += 1
                stop = true
            } else {
                X -= 1
            }
        }
    }
    /**
     * 找单元格上方的所以单元格的isHide是不是都等于true
     * @param cellModels 
     * @param cell 
     * 
     * @return {boolean}
     */
    isAllHideOfTop(cellModels: Array<Array<CellKey>>, cell: CellKey) {
        let X = cell.X - 1,
            Y = cell.Y,
            isAllHide = true;

        while(X >= 0) {
            isAllHide === false
                ? null
                : isAllHide = cellModels[X][Y].isHide
            X--
        }
        return isAllHide;
    }
}

export default new clipboard()