import * as React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Row, Col, Form, Input, Modal } from 'antd'

import $http from 'utils/http'

import { DiaryVO } from 'interface/diary'

import diaryStore from 'store/diary'

import { observer } from 'mobx-react'

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
}

@observer
export default class DiarySetting extends React.Component<{}, {}> {
    render() {
        return (
            <Modal
                width='80%'
                title='详细信息'
                style={{ top: 20 }}
                visible={diaryStore.isShowSetting}
            >
                <Row>
                    <Col span={6}>
                        <Form.Item
                            {...formItemLayout}
                            label='标题'
                            hasFeedback
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label='描述'
                            hasFeedback
                        >
                            <TextArea autosize={{ minRows: 4, maxRows: 6 }}/>
                        </Form.Item>
                    </Col>
                    <Col span={18}></Col>
                </Row>
            </Modal>
        )
    }
}