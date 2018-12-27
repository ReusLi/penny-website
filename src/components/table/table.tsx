import * as React from 'react'

// interface
import { CellKey, SelectInfo, TableState, TableProps } from 'table/interface'

import Cell from 'components/cell/cell'

// 剪切板类
import clipboard from 'components/table/clipboard'

// matrixStore mobx
import cellStore from 'store/cell/cellStore';

import { observer } from 'mobx-react';


@observer
export default class Table extends React.Component<TableProps, TableState> {

    constructor(props: TableProps, state: TableState) {
        super(props);
    }

    /**
     * 初始化单元格
     */
    private initTableHeader(cellModels: Array<Array<CellKey>>) {
        let rowArray: any = [],
            colArray: any = [];
        // cell组件props
        let cellProps: any;

        cellModels.forEach((row: Array<CellKey>, rowIndex: number) => {
            colArray = []
            row.forEach((cell: CellKey) => {
                // 只对isHide !== true 的单元格处理
                if (!cell.isHide) {
                    cellProps = this.getCellProps();
                    cellProps = this.buildCellProps(cellProps, cell)
                    
                    colArray.push(
                        <Cell {...cellProps} />
                        )
                }
            })
            rowArray.push(
                <tr key={`row_${rowIndex}`}>
                    {colArray}
                </tr>
            )
        })

        return rowArray;
    }

    /**
     * 获取表格cell组件的属性
     */
    private getCellProps() {
        let cellProps = {
            key: '',
            text: '',
            cellKey: {
                X: 0,
                Y: 0
            }
            // selectInfo: this.state.selectInfo
        }

        return cellProps;
    }

    /**
     * 构建表格cell组件的props
     * @param cellProps cell组件的props object
     * @param cell cell属性
     */
    private buildCellProps(cellProps: any, cell: CellKey) {

        cellProps.key = `${cell.X}_${cell.Y}`
        cellProps.cellKey.X = cell.X
        cellProps.cellKey.Y = cell.Y
        cellProps.cellKey.rowSpan = cell.rowSpan
        cellProps.cellKey.colSpan = cell.colSpan
        cellProps.text = cell.text
        cellProps.selectInfo = cellStore.selectInfo
        cellProps.isEditable = true
        return cellProps;
    }

    /**
     * 鼠标离开table组件时
     * 把最后一个
     * mouse over cell
     * 变成
     * mouse up cell
     */
    private onMouseLeaveTable() {
        cellStore.onMouseUpWithLastCell()
    }

    componentDidMount() {
        clipboard.bindClipEvent(this.table)
    }

    private table: HTMLElement


    private renderCellList() {
        let tableHeader = this.initTableHeader(this.props.cellModels)
        return (
            <table 
                onMouseLeave={this.onMouseLeaveTable.bind(this)}
                ref={(dom) => 
                    this.table = dom
                }
                >
                <thead className='ant-table-thead'>
                    {tableHeader}
                </thead>
            </table>
        )
    }

    public render() {
        return this.renderCellList()
    }
}