// 单元格信息
export interface CellKey {
    // x坐标
    X: number,
    // y坐标
    Y: number,
    // colSpan 列长度
    colSpan?: number,
    // rowSpan 行长度
    rowSpan?: number,
    // 单元格文字
    text?: string,
    // 是否隐藏单元格
    isHide?: boolean
}

// 选择的2个单元格坐标信息
export interface SelectInfo {
    // 开始的单元格
    startCell: CellKey
    // 结束的单元格
    endCell: CellKey
}

export interface AntdColumn extends CellKey {
    // 列的子代
    children?: Array<any>
    // 列名称
    title?: string
    // column key
    key?: string
    // 是否有父节点, 用于table转columns的时候
    hasParent?: boolean
}