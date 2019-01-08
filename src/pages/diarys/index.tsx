import * as React from 'react'

import { Moment } from 'moment';
import { Row, Col, Calendar, Button } from 'antd';

import $http from 'utils/http'

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

    async componentWillMount() {
        const date = [
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
        ].join('-')
        await this.findDiary(date)
    }

    render() {
        return (
            <Row style={fullHeight}>
                <Col span={6}>
                    <Row>
                        <div style={calendarStyle}>
                            <Calendar
                                fullscreen={false}
                                style={{ background: '#fff' }}
                                onSelect={this.onCalendarSelect.bind(this)}
                                onPanelChange={this.onPanelChange.bind(this)}
                            />
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

    async onCalendarSelect(moment: Moment) {
        const date = moment.format('YYYY-MM-DD')
        await this.findDiary(date)
    }

    async onPanelChange(moment: Moment) {
        const date = moment.format('YYYY-MM-DD')
        await this.findDiary(date)
    }

    private findDiary(date: string): Promise<Array<DiaryVO>> {
        return new Promise(async (resolve, reject) => {
            const condition = {
                where: {
                    createTime: {
                        gte: `${date} 00:00:00`,
                        lte: `${date} 23:59:59`
                    }
                }
            }
            const result = await $http.post('/api/pyDiary/findAll', {
                condition: condition
            })
            const data: Array<DiaryVO> = result.data
            diaryStore.setDiaryList(data)
            resolve(diaryStore.diaryList)
        })
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