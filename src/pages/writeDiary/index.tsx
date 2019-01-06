import * as React from 'react'

import { Row, Button } from 'antd'

import $http from 'utils/http'

import PyEditor from 'components/editor'

import editorStore from 'store/editor'

import { DiaryVO } from 'interface/diary'

export default class WriteDiary extends React.Component<{}, {}> {
    render() {
        return (
            <Row
                style={{ height: '100%' }}
            >
                <Row
                    style={{ marginTop: '20px', height: '90%' }}
                >
                    <PyEditor />
                </Row>
                <Row
                    style={{ marginTop: '10px', padding: '0 5%' }}
                    type='flex'
                    justify='end'
                >
                    <Button
                        type='primary'
                        onClick={this.save}
                    >
                        提交
                        </Button>
                </Row>
            </Row>
        )
    }

    private save() {
        const MDV = editorStore.getValue()

        const diaryVO: DiaryVO = {
            id: String(new Date().getTime()),
            userId: 'penny',
            title: '测试日记',
            content: MDV,
            createTime: new Date().toDateString(),
            updateTime: new Date().toDateString()
        }

        $http.post('/api/pyDiary/add', {
            diaryVO: diaryVO
        })
        console.log(MDV)
    }
}