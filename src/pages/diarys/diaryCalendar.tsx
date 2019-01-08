import * as React from 'react'

import { Moment } from 'moment';
import { Calendar, Badge } from 'antd';

import { findDiaryByDate } from './diarySerivce'
// 日期样式
const calendarStyle = {
    marginLeft: '18px',
    marginTop: '20px',
    width: 300,
    border: '1px solid #d9d9d9',
    borderRadius: 4
}

export default class DiaryCalendar extends React.Component {
    render() {
        return (
            <div style={calendarStyle}>
                <Calendar
                    fullscreen={false}
                    style={{ background: '#fff' }}
                    onSelect={this.onCalendarSelect.bind(this)}
                    onPanelChange={this.onPanelChange.bind(this)}
                    dateFullCellRender={this.cellRender.bind(this)}
                />
            </div>
        )
    }

    cellRender(date: Moment) {
        let cellDate: number | string = date.date()
        cellDate < 10 ? cellDate = `0${cellDate}` : null

        // 带badge的日期
        const badgeDate = (
            <Badge status="success" style={{ right: '-5px' }}>
                <div className="ant-fullcalendar-value">
                    {cellDate}
                </div>
            </Badge>
        )

        // 普通日期
        const normalDate = (
            <div className="ant-fullcalendar-value">
                {cellDate}
            </div>
        )
        return (
            <div className="ant-fullcalendar-date">
                {normalDate}
                <div className="ant-fullcalendar-content"></div>
            </div>
        )
    }

    async onCalendarSelect(moment: Moment) {
        const date = moment.format('YYYY-MM-DD')
        await findDiaryByDate(date)
    }

    async onPanelChange(moment: Moment) {
        const date = moment.format('YYYY-MM-DD')
        await findDiaryByDate(date)
    }
}