import * as React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Row, Col, Form, Input, Modal } from 'antd'

import $http from 'utils/http'

import { DiaryVO } from 'interface/diary'

import diaryStore from 'store/diary'

import { observer } from 'mobx-react'

import ImageCrop from 'components/imageCrop'

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
                title='详细信息'
                style={{ top: 20 }}
                visible={diaryStore.isShowSetting}
                onCancel={() => diaryStore.setIsShowSetting(false)}
                onOk={this.updateDiaryInfo.bind(this)}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            {...formItemLayout}
                            label='标题'
                            hasFeedback
                        >
                            <Input
                                value={diaryStore.curDiaryModel.title}
                                size="large"
                                onChange={this.updateState.bind(this, 'title')}
                            />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label='描述'
                            hasFeedback
                        >
                            <TextArea
                                value={diaryStore.curDiaryModel.desc}
                                autosize={{ minRows: 4, maxRows: 6 }}
                                onChange={this.updateState.bind(this, 'desc')}
                            />
                        </Form.Item>
                    </Col>
                    {/* <Col span={18}>
                        <ImageCrop></ImageCrop>
                    </Col> */}
                </Row>
            </Modal>
        )
    }

    updateState(key: string, e: any) {
        let curDiaryModel = diaryStore.curDiaryModel
        const value = e.target.value
        switch (key) {
            case 'title': {
                curDiaryModel.title = value
                break;
            }
            case 'desc': {
                curDiaryModel.desc = value
                break;
            }
        }

        diaryStore.setCurDiaryModel(curDiaryModel)
    }

    async updateDiaryInfo() {
        let diaryVO: DiaryVO = diaryStore.curDiaryModel
        await $http.post('api/pyDiary/update', {
            diaryVO: diaryVO
        })
        diaryStore.updateDiaryList(diaryVO)
        diaryStore.setIsShowSetting(false)
    }
}