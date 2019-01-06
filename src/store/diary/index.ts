import { observable, action, toJS } from 'mobx';

import appHistory from 'store/route'

import { DiaryVO } from 'interface/diary'

class diaryStore {
    constructor() {

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

    @action setCurDiaryModel(curDiaryModel: DiaryVO) {
        this.curDiaryModel = curDiaryModel
    }

    @action setDiaryList(diaryList: Array<DiaryVO>) {
        this.diaryList = diaryList
    }

    @action setIsShowSetting(isShowSetting: boolean) {
        this.isShowSetting = isShowSetting
    }

    isModifyMode() {
        const search = appHistory.location.search
        return search.indexOf('mode=modify') !== -1
    }

    addDiary(diaryModel: DiaryVO) {
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