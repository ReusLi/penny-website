import { CellKey, SelectInfo } from 'interface/common'

export interface CellKey extends CellKey { }

export interface SelectInfo extends SelectInfo { }

export interface TableProps { 
    cellModels: Array<Array<CellKey>>
}

export interface TableState {
    // 表头是否可以编辑
    isEditable: boolean,
    // 选择的单元格信息
    selectInfo: SelectInfo,
    // mouse down的第一个点坐标
    mouseDownPoint: CellKey
}