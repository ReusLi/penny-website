import { DiaryVO } from 'interface/diary'

import diaryStore from 'store/diary'

import $http from 'utils/http'

/**
 * 根据日期查询日记
 * @param date 日期
 */
export const findDiaryByDate = (date: string): Promise<Array<DiaryVO>> => {
    return new Promise(async (resolve, reject) => {
        const condition = {
            where: {
                createTime: {
                    gte: `${date} 00:00:00`,
                    lte: `${date} 23:59:59`
                }
            }
        }
        const result = await $http.post('/api/pyDiary/findAll', {
            condition: condition
        })
        const data: Array<DiaryVO> = result.data
        diaryStore.setDiaryList(data)
        resolve(diaryStore.diaryList)
    })
}

/**
 * 根据日期记录
 */
export const findDiaryRecord = (): Promise<Array<string>> => {
    return new Promise(async (resolve, reject) => {
        const result = await $http.post('/api/pyDiary/findDiaryRecord')
        const data: Array<string> = result.data
        resolve(data)
    })
}

/**
 * 新增日记
 * 
 * @return {DiaryVO} 新增日记VO
 */
export const addDiary = (diaryVO: DiaryVO): Promise<DiaryVO> => {
    return new Promise(async (resolve, reject) => {
        const result = await $http.post('/api/pyDiary/add', {
            diaryVO: diaryVO
        })
        const data: DiaryVO = result.data
        resolve(data)
    })
}

/**
 * 更新日记
 * 
 * @return {number} 更新的记录数
 */
export const updateDiary = (diaryVO: DiaryVO): Promise<number> => {
    return new Promise(async (resolve, reject) => {
        const result = await $http.post('/api/pyDiary/update', {
            diaryVO: diaryVO
        })
        const updateRow: number = result.data[0]
        resolve(updateRow)
    })
 }