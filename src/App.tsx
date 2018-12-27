import * as React from 'react'

import { Row, Col } from 'antd'

export default class App extends React.Component {

    public render() {
        return (
            <Row>
                <Row className={"top"}
                    type="flex"
                    justify="space-between"
                    align="middle"
                >
                    <Col className={"top-col"}
                        offset={1}
                    >
                        小宝2018日记
                    </Col>

                    <Col span={4}>
                        <Col className={"top-col"} span={8}>照片</Col>
                        <Col className={"top-col"} span={8}>日记</Col>
                        <Col className={"top-col"} span={8}>我</Col>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <img src="../images/pitrue.jpg"></img>
                    </Col>
                </Row>
                <Row></Row>
            </Row>
        )
    }
}