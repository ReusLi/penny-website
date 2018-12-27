import { computed, observable, action, trace, toJS } from 'mobx';

import matrixStore from 'store/matrix/matrixStore'

import util from './util'

/**
 * 初始化时的表格columns数据
 */
const antdColumns = [
    {
        title: '列1',
        key: '1',
        children: [
            {
                title: '列4',
                key: '4',
            }
        ]
    },
    {
        title: '列2',
        key: '2',
        children: [
            {
                title: '列5',
                key: '5'
            }]
    },
    {
        title: '列3',
        key: '3',
        children: [
            {
                title: '列6',
                key: '6'
            }]
    }]

class antdTableStore {
    constructor() {

    }

    @observable columns = antdColumns

    /**
     * 同步表格列信息
     */
    @action syncTableColumns() {
        this.columns = util.syncTableColumns(matrixStore.cellModels)
    }
}

export default new antdTableStore()