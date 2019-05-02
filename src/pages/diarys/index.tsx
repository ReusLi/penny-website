import * as React from 'react'

import { Row, Col, Button } from 'antd';

import { DiaryVO } from 'interface/diary'

import DiaryCalendar from './diaryCalendar'
import DiaryList from 'components/diaryList'

import { findDiaryByDate } from 'serivce/diary'

import appHistory from 'store/route'
import diaryStore from 'store/diary'

import diaryUtil from 'utils/diary'

// import './datePicker.css'

const fullHeight = {
    height: '100%'
}

export default class Dirays extends React.Component<{}, {}> {
    constructor() {
        super({})
    }

    async componentWillMount () {
        const date = [
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
        ].join('-')
        await findDiaryByDate(date)
    }

    render () {
        return (
            <Row style={fullHeight}>
                <Col span={6}>
                    <Row>
                        <DiaryCalendar />
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

    createDiary () {
        const diaryVO: DiaryVO = diaryUtil.getDiaryVO()

        diaryStore.updateCurDiaryModel(diaryVO)
        appHistory.push('write-dirays')
    }
}