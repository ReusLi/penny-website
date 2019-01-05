import * as React from 'react'

import { Row, Button } from 'antd'

import PyEditor from 'components/editor'

export default class WriteDiary extends React.Component<{}, {}> {
    render() {
        return (
            <Row
                style={{ height: '100%' }}
            >
                <Row
                    style={{marginTop: '20px', height: '90%' }}
                >
                    <PyEditor />
                </Row>
                <Row
                    style={{marginTop: '10px', padding: '0 5%'}} 
                    type='flex'
                    justify='end'
                >
                    <Button type='primary'>提交</Button>
                </Row>
            </Row>
        )
    }
}