import { computed, observable, action } from 'mobx'

import { CellKey, SelectInfo } from 'interface/common'

import util from './util';

// utils
import MatrixUtils from 'utils/matrix.utils'
import Cell from 'components/cell/cell';

class cellStore {
    isEditable: boolean = true
    
    isMouseDown: boolean = false

    @observable selectInfo: SelectInfo = {
        startCell: {
            X: -1,
            Y: -1
        },
        endCell: {
            X: -1,
            Y: -1
        }
    }

    mouseDownPoint: CellKey

    lastMouseOverCell: CellKey

    @action onMouseUp(cellKey: CellKey) {
        this.updateCurKeyRand(cellKey)
        this.isMouseDown = false
    }

    @action onMouseDown(cellKey: CellKey) {
        this.selectInfo = {
            startCell: {
                X: cellKey.X,
                Y: cellKey.Y
            },
            endCell: {
                X: cellKey.X,
                Y: cellKey.Y
            }
        }

        this.mouseDownPoint = {
            X: cellKey.X,
            Y: cellKey.Y
        }

        this.isMouseDown = true
    }

    @action onMouseOver(cellKey: CellKey) {
        if (!this.isMouseDown) {
            return false
        }
        // 记录最后一个mouse over的cell, 用于onMouseLeaveTable方法
        this.lastMouseOverCell = cellKey
        this.updateCurKeyRand(cellKey)
    }

    /**
     * 鼠标离开table组件时
     * 把最后一个
     * mouse over cell
     * 变成
     * mouse up cell
     */
    @action onMouseUpWithLastCell() {
        if (this.isMouseDown)
            this.onMouseUp(this.lastMouseOverCell)
    }

    /**
     * 更新坐标范围
     * @param cellKey 
     */
    updateCurKeyRand(cellKey: CellKey) {
        this.selectInfo = util.updateCurKeyRand(cellKey, this.mouseDownPoint)
    }

    /**
     * 判断selectInfo是否为初始状态
     */
    isInitState() {
        return this.selectInfo.startCell.X === -1
            && this.selectInfo.startCell.Y === -1
            && this.selectInfo.endCell.X === -1
            && this.selectInfo.endCell.Y === -1
    }
}

export default new cellStore()