import * as React from 'react'

import { Link } from "react-router-dom";

import { Row, Col } from 'antd';

export default class NavBar extends React.Component {
    render() {
        return (
            <Row className={"top"}
                type="flex"
                justify="space-between"
                align="middle"
            >
                <Col className={"top-col"}
                >
                    <Link to="/">home</Link>
                    <span style={{ marginLeft: '60px' }}
                        onClick={this.onTestClick.bind(this)}
                    >
                        test
                    </span>
                </Col>

                <Col span={4}>
                    <Col className={"top-col"} span={8}>
                        <Link to="/pic">picture</Link>
                    </Col>
                    <Col className={"top-col"} span={8}>
                        <Link to="/dirays">diary</Link>
                    </Col>
                    <Col className={"top-col"} span={8}>
                        <Link to="/user">me</Link>
                    </Col>
                </Col>
            </Row>
        )
    }

    onTestClick() {

    }
}