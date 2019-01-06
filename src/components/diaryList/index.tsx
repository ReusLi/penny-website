import * as React from 'react'

import { observer } from 'mobx-react'

import { Row, Card, Icon, Popconfirm } from 'antd'

import $http from 'utils/http'

import EemptyTips from './emptyTips'

import { DiaryVO } from 'interface/diary'

import appHistory from 'store/route'
import diaryStore from 'store/diary'

import './diaryList.css'

const { Meta } = Card

@observer
export default class DiaryList extends React.Component<{}, {}> {
    constructor() {
        super({})
    }

    async componentWillMount() {
        await this.findDiary();
    }

    private getCards() {
        const cardDatas: Array<DiaryVO> = diaryStore.diaryList
        let cards = [];

        for (let i = 0, len = cardDatas.length; i < len; i++) {
            const VO = cardDatas[i]
            const cardActions = [
                <Icon type="setting"
                    onClick={this.diarySetting.bind(this, VO)}
                />,
                <Icon type="edit"
                    onClick={this.diaryEdit.bind(this, VO)}
                />,
                <Popconfirm
                    title='确定要删掉这篇日记吗?'
                    placement="topRight"
                    okText="是的"
                    cancelText="算了"
                    onConfirm={this.diaryDelete.bind(this, VO.id)}
                >
                    <Icon type="delete"/>
                </Popconfirm>
            ]
            const source = require(`@images/yw/pic${i + 1}.jpg`)
            const CoverImg = <img src={source} style={{ width: '100%' }} />

            cards.push(
                <Row key={i}
                    type='flex'
                    align='top'
                    justify='center'
                >
                    <Card
                        key={i}
                        className='diary-card'
                        cover={CoverImg}
                        actions={cardActions}
                    >
                        <Meta
                            title={VO.title}
                            description={VO.desc}
                        />
                    </Card>
                </Row>
            )
        }

        if (cards.length === 0) {
            cards.push(<EemptyTips key={new Date().getTime()} />)
        }

        return cards;
    }

    private findDiary(): Promise<Array<DiaryVO>> {
        return new Promise(async (resolve, reject) => {
            const result = await $http.post('/api/pyDiary/findAll')
            const data: Array<DiaryVO> = result.data
            diaryStore.setDiaryList(data)
            resolve(diaryStore.diaryList)
        })
    }
    private diarySetting(model: DiaryVO) {
        diaryStore.setCurDiaryModel(model)
        diaryStore.setIsShowSetting(true)
    }

    private diaryEdit(model: DiaryVO) {
        diaryStore.setCurDiaryModel(model)

        appHistory.push({
            pathname: '/write-dirays',
            search: '?mode=modify'
        });
    }

    private diaryDelete(id: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const result = await $http.post('/api/pyDiary/delete', {
                id: id
            })
            const isDeleteSuccess: boolean = result.data
            isDeleteSuccess
                ? diaryStore.removeDiary(id)
                : null
            resolve(isDeleteSuccess)
        })
    }

    render() {
        const Cards = this.getCards()
        return (
            <Row type='flex'
                justify='center'
                className='diary-list'>
                {Cards}

            </Row>
        )
    }
}