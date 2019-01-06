import * as React from 'react'

import { Button, message } from 'antd'

import $http from 'utils/http'

import editorStore from 'store/editor'
import diaryStore from 'store/diary'
import appHistory from 'store/route'

import { DiaryVO } from 'interface/diary'

export default class SaveButton extends React.Component<{}, {}> {
    render() {
        return (
            <Button
                type='primary'
                onClick={this.save.bind(this)}
            >
                保存
            </Button>
        )
    }

    private save() {
        diaryStore.isModifyMode()
            ? this.updateDiary()
            : this.addDiary()
    }

    private async updateDiary() {
        let diaryVO: DiaryVO = diaryStore.curDiaryModel
        diaryVO.updateTime = new Date().toDateString()
        diaryVO.content = editorStore.getValue()

        diaryStore.setCurDiaryModel(diaryVO)

        const result = await $http.post('/api/pyDiary/update', {
            diaryVO: diaryVO
        })
        const updateRow: number = result.data[0]
        updateRow === 1
            ? message.success('保存成功')
            : message.warning('没有变更, 不需要保存')
    }

    private async addDiary() {
        let diaryVO: DiaryVO = diaryStore.curDiaryModel
        
        if (diaryVO.title === '') {
            diaryStore.setIsShowSetting(true)
            return false
        }

        diaryVO.id = String(new Date().getTime())
        diaryVO.userId = 'penny'
        diaryVO.createTime = diaryVO.updateTime = new Date().toJSON()
        diaryVO.content = editorStore.getValue()

        const result = await $http.post('/api/pyDiary/add', {
            diaryVO: diaryVO
        })
        const model: DiaryVO = result.data
        diaryStore.setCurDiaryModel(model)
        diaryStore.addDiary(model)
        message.success('保存成功')
        appHistory.push({
            pathname: '/write-dirays',
            search: '?mode=modify'
        })
    }
}