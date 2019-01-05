import * as React from 'react'

import { Row, Col, Calendar } from 'antd';

import DiaryList from 'components/diaryList'

// import './datePicker.css'

// 日期样式
const calendarStyle = {
    marginLeft: '18px',
    marginTop: '20px',
    width: 300,
    border: '1px solid #d9d9d9',
    borderRadius: 4
}

const fullHeight = {
    height: '100%'
}

export default class DirayDate extends React.Component<{}, {}> {
    constructor() {
        super({})
    }


    render() {
        return (
            <Row style={fullHeight}>
                <Col span={6}>
                    <Row>
                        <div style={calendarStyle}>
                            <Calendar fullscreen={false} style={{ background: '#fff' }} />
                        </div>
                    </Row>
                </Col>
                <Col style={fullHeight}
                    span={18}
                >
                    <Row style={fullHeight}
                        type='flex'
                        align='middle'
                        justify='center'
                    >
                        <DiaryList />
                    </Row>
                </Col>
            </Row>
        )
    }
}