import * as React from 'react'

import { Button, message } from 'antd'

import diaryStore from 'store/diary'
import editorStore from 'store/editor'

import { DiaryVO } from 'interface/diary'

import { updateDiary } from 'serivce/diary'

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
            : diaryStore.setIsShowSetting(true)
    }

    private async updateDiary() {
        const model = {
            updateTime: new Date().toDateString(),
            content: editorStore.getValue()
        }

        diaryStore.updateCurDiaryModel(model)
        
        const updateRow: number = await updateDiary(diaryStore.curDiaryModel)

        if (updateRow === 1) {
            message.success('保存成功')
        } else {
            message.warning('没有变更, 不需要保存')
        }
    }

}