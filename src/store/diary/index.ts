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

    @observable isShowSetting: boolean = false

    @action setCurDiaryModel(curDiaryModel: DiaryVO) {
        this.curDiaryModel = curDiaryModel
    }

    @action setIsShowSetting(isShowSetting: boolean) {
        this.isShowSetting = isShowSetting
    }

    isModifyMode() {
        const search = appHistory.location.search
        return search.indexOf('mode=modify') !== -1
    }
}

export default new diaryStore()