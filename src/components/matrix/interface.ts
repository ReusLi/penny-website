import { CellKey, SelectInfo } from 'interface/common'

export interface CellKey extends CellKey { }

export interface SelectInfo extends SelectInfo { }

export interface MatrixState {
    // row 矩阵行数
    row: number,

    // col 矩阵列数
    col: number,

    // cellModels 矩阵内单元格模型 是一个 row * col 的 二维数组
    cellModels: Array<Array<CellKey>>
}

export interface MatrixProps {

}