import * as React from 'react'

import { Calendar } from 'antd';

import './datePicker.css'

// 日期样式
const calendarStyle = { width: '100%', background: '#fff', border: '1px solid #d9d9d9', borderRadius: 4 }

export default class DirayDate extends React.Component {
    constructor() {
        super({})
    }


    render() {
        return (
            <div style={calendarStyle}>
                <Calendar fullscreen={false} />
            </div>
        )
    }
}