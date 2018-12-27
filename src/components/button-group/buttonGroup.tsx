import * as React from 'react'

import { Button, Col, Row } from 'antd';

// matrixStore mobx
import matrixStore from 'store/matrix/matrixStore'

// cellStore mobx
import cellStore from 'store/cell/cellStore'

// antd table store
import antdTableStore from 'store/antdTableStore'

// code store
import codeStore from 'store/codeStore'

import { CellKey } from 'components/matrix/interface';
import Cell from 'components/cell/cell';

export default class ButtonGroup extends React.Component {
    public render() {
        return (
            <Row>
                <Row>
                    <Col span={4}>
                        <Button
                            onMouseUp={matrixStore.mergeCells.bind(matrixStore)}
                        >合并</Button>
                    </Col>
                    <Col span={4}>
                        <Button
                            onMouseUp={matrixStore.disMergeCell.bind(matrixStore)}
                        >拆分</Button>
                    </Col>

                    <Col span={4}>
                        <Button
                            onMouseUp={antdTableStore.syncTableColumns.bind(antdTableStore)}
                        >生成</Button>
                    </Col>

                    <Col span={4}>
                        <Button
                            onMouseUp={() => {
                                codeStore.setVisible(true)
                            }}
                        >代码</Button>
                    </Col>

                </Row>

                <Row style={{ marginTop: '20px' }}>
                    <Col span={4}>
                        <Button
                            onMouseUp={this.addRow.bind(this)}
                        >加行</Button>
                    </Col>

                    <Col span={4}>
                        <Button
                            onMouseUp={this.addCol.bind(this)}
                        >加列</Button>
                    </Col>

                    <Col span={4}>
                        <Button
                            onMouseUp={this.delRow.bind(this)}
                        >删行</Button>
                    </Col>

                    <Col span={4}>
                        <Button
                            onMouseUp={this.delCol.bind(this)}
                        >删列</Button>
                    </Col>
                </Row>
            </Row>
        )
    }

    private addRow() {
        let cellModels = matrixStore.cellModels,
            newRow: Array<CellKey> = []

        const X = cellModels.length

        cellModels[0].forEach((item, index) => {
            const cell: CellKey = {
                X: X,
                Y: index,
                rowSpan: 1,
                colSpan: 1,
                isHide: false,
                text: `未命名`
            }
            newRow.push(cell)
        })

        cellModels.push(newRow)

        matrixStore.setCellModels(cellModels)
    }

    private addCol() {
        let cellModels = matrixStore.cellModels

        cellModels.map((row, index) => {
            const cell: CellKey = {
                X: index,
                Y: row.length,
                rowSpan: 1,
                colSpan: 1,
                isHide: false,
                text: `未命名`
            }
            row.push(cell)
        })

        matrixStore.setCellModels(cellModels)
    }

    private delRow() {
        let cellModels = matrixStore.cellModels

        const selectInfo = cellStore.selectInfo

        if (this.isSelectSingleCell(selectInfo.startCell, selectInfo.endCell)) {
            const delRowIndex = selectInfo.startCell.X
            cellModels = cellModels.filter((row, rowIndex) => {
                return rowIndex !== delRowIndex
            })

            matrixStore.setCellModels(cellModels)
        }

    }

    private delCol() {
        let cellModels = matrixStore.cellModels

        const selectInfo = cellStore.selectInfo

        if (this.isSelectSingleCell(selectInfo.startCell, selectInfo.endCell)) {
            const delColIndex = selectInfo.startCell.Y

            cellModels.map(row => {
                row.splice(delColIndex, 1)
            })

            matrixStore.setCellModels(cellModels)
        }
    }

    /**
     * 判断是否只选中一个单元格
     * @param startCell 
     * @param endCell 
     */
    private isSelectSingleCell(startCell: CellKey, endCell: CellKey) {
        return startCell.X === endCell.X
            && startCell.Y === endCell.Y
            && startCell.X >= 0
            && startCell.Y >= 0
    }
}