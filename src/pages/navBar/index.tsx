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
                    <Link to="/">小宝2018日记</Link>
                </Col>

                <Col span={4}>
                    <Col className={"top-col"} span={8}>
                        <Link to="/pic">照片</Link>
                    </Col>
                    <Col className={"top-col"} span={8}>
                        <Link to="/note">日记</Link>
                    </Col>
                    <Col className={"top-col"} span={8}>
                        <Link to="/user">我</Link>
                    </Col>
                </Col>
            </Row>
        )
    }
}