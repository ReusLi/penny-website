import { observable, action, reaction, autorun, when, toJS } from 'mobx';

import editorStore from 'store/editor'
import appHistory from 'store/route'

import { DiaryVO } from 'interface/diary'

import { addDiary } from 'pages/diarys/diarySerivce'

class diaryStore {
    constructor() {
        when(
            () => {
                return !this.isShowSetting && this.curDiaryModel.title !== ''
            },
            () => {
                this.addDiary()
            }
        )
    }

    @observable curDiaryModel: DiaryVO = {
        id: '',
        title: '',
        userId: '',
        desc: '',
        content: '',
        createTime: '',
        updateTime: ''
    }

    @observable diaryList: Array<DiaryVO> = []

    @observable isShowSetting: boolean = false

    @action('更新当前日记Model值') setCurDiaryModel(curDiaryModel: DiaryVO) {
        this.curDiaryModel = curDiaryModel
    }

    @action('设置日记List') setDiaryList(diaryList: Array<DiaryVO>) {
        this.diaryList = diaryList
    }

    @action('显示设置日记的modal面板') setIsShowSetting(isShowSetting: boolean) {
        this.isShowSetting = isShowSetting
    }


    isModifyMode() {
        const search = appHistory.location.search
        return search.indexOf('mode=modify') !== -1
    }

    async addDiary() {
        let diaryVO: DiaryVO = this.curDiaryModel
        diaryVO.id = String(new Date().getTime())
        diaryVO.userId = 'penny'
        diaryVO.createTime = diaryVO.updateTime = new Date().toJSON()
        diaryVO.content = editorStore.getValue()

        const model: DiaryVO = await addDiary(diaryVO)
        this.addDiaryToList(model)
        appHistory.push({
            pathname: '/write-dirays',
            search: '?mode=modify'
        })
    }

    addDiaryToList(diaryModel: DiaryVO) {
        this.diaryList.unshift(diaryModel)
    }

    updateDiaryList(diaryModel: DiaryVO) {
        this.diaryList = this.diaryList.map(diary => {
            diary.id === diaryModel.id
                ? diary = diaryModel
                : null
            return diary
        })
    }

    removeDiary(id: string) {
        this.diaryList = this.diaryList.filter(diary => diary.id !== id)
    }
}

export default new diaryStore()