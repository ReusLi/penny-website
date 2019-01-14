import * as React from 'react'

import { Moment } from 'moment';
import { Calendar, Badge } from 'antd';

import { findDiaryByDate, findDiaryRecord } from 'serivce/diary'
// 日期样式
const calendarStyle = {
    marginLeft: '18px',
    marginTop: '20px',
    width: 300,
    border: '1px solid #d9d9d9',
    borderRadius: 4
}

interface State {
    diaryRecord: Array<string>
}

export default class DiaryCalendar extends React.Component<{}, State> {
    state: State = {
        diaryRecord: []
    }

    render() {
        return (
            <div style={calendarStyle}>
                <Calendar
                    fullscreen={false}
                    style={{ background: '#fff' }}
                    onSelect={this.onCalendarSelect.bind(this)}
                    onPanelChange={this.onPanelChange.bind(this)}
                    dateFullCellRender={this.cellRender.bind(this)}
                    disabledDate={this.disabledDate.bind(this)}
                />
            </div>
        )
    }

    async componentWillMount() {
        const data: Array<any> = await findDiaryRecord()
        const diaryRecord = data.map(item => item.date)
        this.setState({
            diaryRecord: diaryRecord
        })
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

        const cellFormatDate = date.format('YYYY-MM-DD')
        return (
            <div className="ant-fullcalendar-date">
                {
                    this.state.diaryRecord.indexOf(cellFormatDate) !== -1
                        ? badgeDate
                        : normalDate
                }
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

    /**
     * 控制写日记的时间只能到今天为止
     * @param currentDate 日历cell的日期对象
     * 
     * @return {boolean} 是否禁用日历cell
     */
    disabledDate(currentDate: Moment) {
        const curTimeStamp = new Date().getTime(),
            dateTimeStamp = currentDate.valueOf()

        return dateTimeStamp > curTimeStamp
    }
}