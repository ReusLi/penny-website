import { observable, action, reaction, autorun, when, toJS, computed } from 'mobx';

import editorStore from 'store/editor'
import appHistory from 'store/route'

import { DiaryVO } from 'interface/diary'

import { addDiary } from 'serivce/diary'

import diaryUtil from 'utils/diary'

class diaryStore {
    constructor() {
        autorun(() => {
            if (!this.isShowSetting && this.curDiaryModel.title !== '' && this.curDiaryModel.id === '') {
                this.addDiary()
            }
        })
    }

    @observable curDiaryModel: DiaryVO = diaryUtil.getDiaryVO()

    @observable diaryList: Array<DiaryVO> = []

    @observable isShowSetting: boolean = false

    @action('更新当前日记Model值')
    updateCurDiaryModel(model: DiaryVO) {
        Object.keys(model).forEach((key: string) => {
            this.curDiaryModel[key] = model[key]
        })
    }

    @action('设置日记List')
    setDiaryList(diaryList: Array<DiaryVO>) {
        this.diaryList = diaryList
    }

    @action('显示设置日记的modal面板')
    setIsShowSetting(isShowSetting: boolean) {
        this.isShowSetting = isShowSetting
    }

    @computed get curDiaryModelClone(): DiaryVO {
        let cloneVO: DiaryVO = {}
        Object.keys(this.curDiaryModel).forEach((key: string) => {
            cloneVO[key] = this.curDiaryModel[key]
        })
        return cloneVO
    }

    isModifyMode() {
        const search = appHistory.location.search
        return search.indexOf('mode=modify') !== -1
    }

    async addDiary() {
        const curTime: string = new Date().toJSON()
        const model: DiaryVO = {
            id: String(new Date().getTime()),
            userId: 'penny',
            createTime: curTime,
            updateTime: curTime,
            content: editorStore.getValue()
        }

        this.updateCurDiaryModel(model)

        await addDiary(this.curDiaryModel)

        this.addDiaryToList(model)
        appHistory.push({
            pathname: '/write-dirays',
            search: '?mode=modify'
        })
    }

    @action('加一个DiaryVO到DiaryList里面')
    addDiaryToList(diaryModel: DiaryVO) {
        this.diaryList.unshift(diaryModel)
    }

    @action('更新DiaryList里面的DiaryVO')
    updateDiaryList(diaryModel: DiaryVO) {
        this.diaryList = this.diaryList.map(diary => {
            diary.id === diaryModel.id
                ? diary = diaryModel
                : null
            return diary
        })
    }

    @action('删除DiaryList里面的DiaryVO')
    removeDiary(id: string) {
        this.diaryList = this.diaryList.filter(diary => diary.id !== id)
    }
}

export default new diaryStore()