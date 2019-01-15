import * as React from 'react'

import { observer } from 'mobx-react'

import { Row, Card, Icon, Popconfirm } from 'antd'

import Scrollbars from 'react-custom-scrollbars'

import $http from 'utils/http'

import EemptyTips from './emptyTips'

import { DiaryVO } from 'interface/diary'

import appHistory from 'store/route'
import diaryStore from 'store/diary'

import './diaryList.css'

const { Meta } = Card

@observer
export default class DiaryList extends React.Component<{}, {}> {
    state = {
        hoverKey: -1
    }
    constructor() {
        super({})
    }

    /**
     * 渲染
     */
    render() {
        const Cards = this.getCards()
        return (
            <Scrollbars>
                {Cards}
            </Scrollbars>
        )
    }

    /**
     * 获取卡片list
     * 
     * @return {arrya} 卡片list
     */
    private getCards(): Array<any> {
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
                    <Icon
                        type="delete"
                    />
                </Popconfirm>
            ]
            const source = require(`@images/yw/pic${i + 1}.jpg`)
            const coverImg = <img src={source} className='zoom-image' />

            cards.push(
                <Row key={i}
                    type='flex'
                    align='top'
                    justify='center'
                >
                    <Card
                        onMouseEnter={this.setActionsShow.bind(this, i)}
                        onMouseLeave={this.setActionsShow.bind(this, -1)}
                        key={i}
                        hoverable={true}
                        className='diary-card'
                        cover={coverImg}
                        actions={this.state.hoverKey === i ? cardActions : null}
                    >
                        <Meta
                            title={VO.title}
                            description={VO.desc}
                        />
                    </Card>
                </Row>
            )
        }

        cards.length === 0
            ? cards.push(<EemptyTips key={new Date().getTime()} />)
            : null;

        return cards;
    }

    /**
     * 设置要展示actions的卡片下标
     * 鼠标移入卡片时, actions才会展示出来
     * @param hoverKey 
     */
    setActionsShow(hoverKey: number) {
        this.setState({ hoverKey })
    }

    /**
     * 打开日记设置信息
     * @param model 
     */
    private diarySetting(model: DiaryVO) {
        diaryStore.updateCurDiaryModel(model)
        diaryStore.setIsShowSetting(true)
    }

    /**
     * 编辑日记
     * @param model 
     */
    private diaryEdit(model: DiaryVO) {
        diaryStore.updateCurDiaryModel(model)

        appHistory.push({
            pathname: '/write-dirays',
            search: '?mode=modify'
        });
    }

    /**
     * 删除日记
     * @param id 
     */
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
}