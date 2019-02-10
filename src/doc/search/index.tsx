import * as React from 'react'
import $http from 'utils/http'

import { Row, Col, Mention } from 'antd'

const { toString, toContentState } = Mention;

export default class Search extends React.Component {
    render() {
        return (
            <Row
                type='flex'
                justify="end"
            >
                <Col>
                    {/* <Mention
                        style={{ width: '100%' }}
                        onChange={this.onChange.bind(this)}
                        defaultValue={toContentState('@afc163')}
                        defaultSuggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
                        onSelect={this.onSelect.bind(this)}
                    /> */}
                </Col>
            </Row>
        )
    }

    onChange() {

    }
    onSelect() {

    }
}