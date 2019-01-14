import * as React from 'react'

import { Row, Col, Form, Input, Modal } from 'antd'

import $http from 'utils/http'

import { DiaryVO } from 'interface/diary'

import diaryStore from 'store/diary'

import { observer } from 'mobx-react'

import ImageCrop from 'components/imageCrop'

import UpLoadImage from 'components/uploadImage'

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
}

@observer
export default class DiarySetting extends React.Component<{}, {}> {
    state = {
        title: '',
        desc: ''
    }
    
    render() {
        return (
            <Modal
                title='详细信息'
                style={{ top: 20, height: '95%' }}
                width='90%'
                visible={diaryStore.isShowSetting}
                onCancel={() => diaryStore.setIsShowSetting(false)}
                onOk={this.updateDiaryInfo.bind(this)}
            >
                <Row>
                    <Col span={6}>
                        <Form.Item
                            {...formItemLayout}
                            label='标题'
                            hasFeedback
                        >
                            <Input
                                value={diaryStore.curDiaryModelClone.title}
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
                                value={diaryStore.curDiaryModelClone.desc}
                                autosize={{ minRows: 4, maxRows: 6 }}
                                onChange={this.updateState.bind(this, 'desc')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        {/* <ImageCrop></ImageCrop> */}
                        <UpLoadImage></UpLoadImage>
                    </Col>
                </Row>
            </Modal>
        )
    }

    updateState(key: string, e: any) {
        const value = e.target.value
        switch (key) {
            case 'title': {
                diaryStore.updateCurDiaryModel({
                    title: value
                })
                break;
            }
            case 'desc': {
                diaryStore.updateCurDiaryModel({
                    desc: value
                })
                break;
            }
        }
    }

    async updateDiaryInfo() {
        await $http.post('api/pyDiary/update', {
            diaryVO: diaryStore.curDiaryModelClone
        })
        diaryStore.updateDiaryList(diaryStore.curDiaryModelClone)
        diaryStore.setIsShowSetting(false)
    }
}