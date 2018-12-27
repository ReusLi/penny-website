import { CellKey } from 'interface/common'

import { SelectInfo } from 'table/interface'

// utils 
import MatrixUtils from 'utils/matrix.utils'
import { debug } from 'util';

import { message } from 'antd';
import Cell from 'components/cell/cell';

class mapUtil {
    /**
     * 找出矩阵中目前被选中的单元格
     * 
     * @param cellModels 
     * @param callback 
     */
    mapCells(cellModels: Array<Array<CellKey>>, callback: Function) {
        let xLen: number = cellModels.length,
            yLen: number = cellModels[0].length,
            cellList: Array<CellKey> = [];

        for (let i = 0; i < xLen; i++) {
            for (let j = 0; j < yLen; j++) {
                let cell: CellKey = cellModels[i][j]

                callback(cell)
            }
        }
        return cellList
    }
}

class Util {
    public mapUtil: any

    constructor () {
        this.mapUtil = new mapUtil()
    }
    tips(msg: string) {
        message.warning(msg);
    }

    /**
     * 初始化一个n*n的二维数据
     * 每一个元素代表一个单元格
     * 并初始化一些属性
     * 
     * @param row 
     * @param col 
     */
    buildMatrixModel(row: number, col: number) {
        let matrixModel: Array<Array<CellKey>> = [],
            cellModel: CellKey,
            index = 0;

        for (let i = 0; i < row; i++) {
            matrixModel.push([])
            for (let j = 0; j < col; j++) {
                cellModel = {
                    X: i,
                    Y: j,
                    rowSpan: 1,
                    colSpan: 1,
                    text: `列${++index}`
                }

                matrixModel[i].push(cellModel)
            }
        }

        return matrixModel;
    }

    /**
     * 检查单元格合法性
     */
    isIllegalCell(selectInfo: SelectInfo) {
        const mouseDownCell = selectInfo.startCell,
            mouseUpCell = selectInfo.endCell

        // 判断mouse down 和 mouse up是不是同一个单元格
        return this.isSameCellKey(mouseDownCell, mouseUpCell)
    }

    /**
     * no comment
     * @param ck1 
     * @param ck2 
     */
    isSameCellKey(ck1: CellKey, ck2: CellKey) {
        return ck1.X === ck2.X && ck1.Y === ck2.Y;
    }
    /**
     * 根据选择区域, 合并单元格
     * @param cellModels 
     * @param selectInfo 
     */
    mergeCells(cellModels: Array<Array<CellKey>>, selectInfo: SelectInfo) {
        // 获取选中的cell list
        let cellList: Array<CellKey> = []

        new mapUtil().mapCells(cellModels, (cell: CellKey) => {
            // 判断是否在隐藏区域范围内, 如果在区域内, 放入cellList
            if (MatrixUtils.isInSideCell(selectInfo, cell)) {
                cellList.push(cell)
            }
        })

        // 选择区域中是否有合并过的单元格
        const hasMergeCell = cellList.some(cell => {
            const isHide = cell.isHide
            const isFirstCell = cell.rowSpan !== 1 || cell.colSpan !== 1

            return isHide || isFirstCell
        })

        // 如果有, 不进行二次合并, 直接返回cellModels
        if (hasMergeCell) {
            this.tips(`已经合并的单元格不能进行二次合并`)
            return cellModels
        }

        // 第一个是左上角的单元格, 需要拿出来设置rowspan colspan等数据
        let firstCell = cellList.shift()
        firstCell.rowSpan = selectInfo.endCell.X - selectInfo.startCell.X + 1
        firstCell.colSpan = selectInfo.endCell.Y - selectInfo.startCell.Y + 1

        // 把其余的单元格设置isHide=true, 隐藏起来
        cellList.map(cell => cell.isHide = true)

        return cellModels
    }

    /**
     * 根据选择单元格, 拆分
     * @param cellModels 
     * @param selectInfo 
     */
    disMergeCell(cellModels: Array<Array<CellKey>>, selectInfo: SelectInfo) {
        // 获取选中的cell list
        let cellList: Array<CellKey> = []

        // 根据当前选中的单元格找到cellModel里面的cell (curSelectCell)
        // 根据curSelectCell里面的rowSpan, colSpan计算出原来的selectInfo
        const X = selectInfo.startCell.X,
            Y = selectInfo.startCell.Y,
            curSelectCell = cellModels[X][Y],
            rowSpan = curSelectCell.rowSpan,
            colSpan = curSelectCell.colSpan;

        selectInfo.endCell.X = selectInfo.startCell.X + rowSpan - 1
        selectInfo.endCell.Y = selectInfo.startCell.Y + colSpan - 1

        new mapUtil().mapCells(cellModels, (cell: CellKey) => {
            // 判断是否在隐藏区域范围内, 如果在区域内, 放入cellList
            if (MatrixUtils.isInSideCell(selectInfo, cell)) {
                cellList.push(cell)
            }
        })

        // 第一个是左上角的单元格, 需要拿出来设置rowspan colspan等数据
        let firstCell = cellList.shift()
        firstCell.rowSpan = 1
        firstCell.colSpan = 1

        // 把其余的单元格设置isHide=true, 隐藏起来
        cellList.map(cell => cell.isHide = false)

        return cellModels
    }
}

export default new Util()