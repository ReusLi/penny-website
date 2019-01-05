import * as React from 'react'
import axios from 'axios'
import http from 'utils/http'

import { Row, Col } from 'antd'

export default class Home extends React.Component {
    async componentDidMount() {
        this.test();

        // http.get('/api/test/testGet')
        //     .then((response: any) => {
        //         this.setState({ serverports: response.data });
        //     })
        //     .catch((error: any) => {
        //         console.log(error);
        //     })
    }

    async test() {
        const result = await http.get('/api/test/testGet');
        console.log(`result=${JSON.stringify(result)}`)
    }
    public render() {
        return (
            <Row>
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