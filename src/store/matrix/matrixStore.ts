import { computed, observable, action, trace, toJS } from 'mobx';

import { CellKey, SelectInfo } from 'interface/common'

// utils 
import MatrixUtils from 'utils/matrix.utils'

import util from './util'

// matrixStore mobx
import cellStore from 'store/cell/cellStore'

class matrixStore {
  /**
   * 矩阵行数
   */
  row: number = 2
  /**
   * 矩阵列数
   */
  col: number = 3
  /**
   * mouse down cell
   */
  mouseDownCell: CellKey
  /**
   * mouse up cell
   */
  mouseUpCell: CellKey
  /**
   * 矩阵单元格模型
   */
  @observable cellModels: Array<Array<CellKey>> = []

  constructor() {

  }

  @action setCellModels(cellModels: Array<Array<CellKey>>) {
    console.log(`----setCellModels----`)
    console.log(toJS(cellModels))
    this.cellModels = cellModels
  }

  /**
   * 隐藏的单元格
   */
  @computed get hideCells() {
    let hideCells: Array<CellKey> = []
    util.mapUtil.mapCells(this.cellModels, (cell: CellKey) => {
      cell.isHide
        ? hideCells.push(cell)
        : null
    })
    return hideCells
  }

  /**
   * 根据cellStore 的 selectInfo (选择的单元格范围)
   * 更新cell list
   * 包括 hide cell list 和 merge cell list
   */
  updateCellList(selectInfo: SelectInfo) {
    const mouseDownCell = selectInfo.startCell,
      mouseUpCell = selectInfo.endCell

    let SelectInfo: SelectInfo = MatrixUtils.buildXY(mouseDownCell, mouseUpCell)

    return util.mergeCells(this.cellModels, SelectInfo)
  }

  /**
   * 初始化n*n的数据模型
   */
  initMatrixModel() {
    const row = this.row
    const col = this.col

    let cellModels: Array<Array<CellKey>> = util.buildMatrixModel(row, col)

    this.cellModels = cellModels
  }
  /**
  * 合并单元格
  */
  mergeCells() {
    let selectInfo = cellStore.selectInfo
    if (util.isIllegalCell(selectInfo))
      return

    const mouseDownCell = selectInfo.startCell,
      mouseUpCell = selectInfo.endCell

    selectInfo = MatrixUtils.buildXY(mouseDownCell, mouseUpCell)

    this.cellModels = util.mergeCells(this.cellModels, selectInfo)
  }
  /**
   * 拆分单元格
   */
  disMergeCell() {
    let selectInfo = cellStore.selectInfo

    this.cellModels = util.disMergeCell(this.cellModels, selectInfo)
  }

  /**
   * 
   * @param cell 要更新的cell
   * @param text 更新的text值
   */
  updateCellText(cell: CellKey, text: string) {
    util.mapUtil.mapCells(this.cellModels, (cellItem: CellKey) => {
      if (util.isSameCellKey(cellItem, cell)) {
        cellItem.text = text
      }
    })
  }

}

export default new matrixStore()
