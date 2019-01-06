import { observable, action, toJS } from 'mobx';

import appHistory from 'store/route'

import { DiaryVO } from 'interface/diary'

class diaryStore {
    constructor() {

    }

    @observable curDiaryModel: DiaryVO = null

    @action setCurDiaryModel(curDiaryModel: DiaryVO) {
        this.curDiaryModel = curDiaryModel
    }

    isModifyMode() {
        const search = appHistory.location.search
        return search.indexOf('mode=modify') !== -1
    }
}

export default new diaryStore()