import * as React from 'react'

import { Row, Col, Calendar, Button } from 'antd';

import { DiaryVO } from 'interface/diary'

import DiaryList from 'components/diaryList'

import appHistory from 'store/route'
import diaryStore from 'store/diary'

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

export default class Dirays extends React.Component<{}, {}> {
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
                    <Row
                        style={{ marginLeft: '18px', marginTop: '20px' }}
                        type='flex'
                    >
                        <Button
                            style={{ width: '300px' }}
                            type='primary'
                            size='large'
                            onClick={this.createDiary.bind(this)}
                        >
                            创建日记
                        </Button>
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

    createDiary() {
        const diaryVO: DiaryVO = {
            id: '',
            title: '',
            userId: '',
            desc: '',
            content: '',
            createTime: '',
            updateTime: ''
        }
        diaryStore.setCurDiaryModel(diaryVO)
        appHistory.push('write-dirays')
    }
}