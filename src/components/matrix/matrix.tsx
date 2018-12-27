import * as React from 'react'

import { Row } from 'antd'

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table'
import Code from 'components/code/code'

import { observer } from 'mobx-react'

// interface
import { MatrixProps, CellKey, SelectInfo } from './interface'

// matrixStore mobx
import matrixStore from 'store/matrix/matrixStore'

@observer
export default class Matrix extends React.Component<MatrixProps> {

    public render() {
        return (
            <Row>
                {/* 操作cell的按钮组 */}
                <Row className='kjax-handle-btn'>
                    <ButtonGroup />
                </Row>

                {/* cell panel */}
                <Row>
                    <Table cellModels={matrixStore.cellModels} />
                </Row>

                {/* 代码模块 */}
                <Code></Code>
            </Row>
        )
    }

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        matrixStore.initMatrixModel()
    }
}