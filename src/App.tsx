import * as React from 'react'

import Matrix from 'components/matrix/matrix'

import AntdTable from 'components/antd-table'

import { Row, Col } from 'antd'

export default class App extends React.Component {

    public render() {
        return (
            <Row gutter={20}>
                <Col span={12}>
                    <Matrix />
                </Col>
                <Col span={12}>
                    <AntdTable />
                </Col>
            </Row>
        )
    }
}