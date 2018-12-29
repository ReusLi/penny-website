import * as React from 'react'
import { Link } from 'react-router-dom'

import { Row, Col } from 'antd'

export default class Home extends React.Component {

    public render() {
        return (
            <Row>
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
                <Row className={"middle"}>
                    <Col span={8}>
                        <Row className={"text1"}>喀什</Row>
                        <Row className={"text2"}>LAND OF THE RISING SUN</Row>
                        <Row className={"text3"}>subsequent compilations developin</Row>
                        <Row className={"text4"}>
                            Using this, no processing is done when webpack 'debug' mode is used and the loader acts as a regular file-loader.
                            Use this to speed up initial and, to a lesser extent, subsequent compilations while developing or using webpack-dev-server.
                            Normal builds are processed normally, outputting optimized files.
                            Using this, no processing is done when webpack 'debug' mode is used and the loader acts as a regular file-loader.
                            Use this to speed up initial and, to a lesser extent, subsequent compilations while developing or using webpack-dev-server.
                            Normal builds are processed normally, outputting optimized files.
                            Using this, no processing is done when webpack 'debug' mode is used and the loader acts as a regular file-loader.
                            Use this to speed up initial and, to a lesser extent, subsequent compilations while developing or using webpack-dev-server.
                            Normal builds are processed normally, outputting optimized files.
                            Use this to speed up initial and, to a lesser extent, subsequent compilations while developing or using webpack-dev-server.
                            Normal builds are processed normally, outputting optimized files.
                        </Row>
                    </Col>
                    <Col span={14} offset={2}>
                        <img className={"mid-img"} src="../images/pitrue.jpg"></img>
                    </Col>
                </Row>
                <Row></Row>
            </Row>
        )
    }
}