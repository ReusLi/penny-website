import * as React from 'react'

import { Calendar } from 'antd';

// import './datePicker.css'

// 日期样式
const calendarStyle = { height: '100%', width: '100%', background: 'rgb(255, 255, 255, 0.3)', border: '1px solid #d9d9d9', borderRadius: 4 }

const calendarComStyle = {}
export default class DirayDate extends React.Component {
    constructor() {
        super({})
    }


    render() {
        return (
            <div style={calendarStyle}>
                <Calendar style={calendarComStyle} fullscreen={false} />
            </div>
        )
    }
}