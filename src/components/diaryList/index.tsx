import * as React from 'react'

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Row, Card, Icon } from 'antd'

import $http from 'utils/http'

import EemptyTips from './emptyTips'

import { DiaryVO } from 'interface/diary'

import appHistory from 'store/route'

import './diaryList.css'

const { Meta } = Card

interface states {
    cards: any
}

export default class DiaryList extends React.Component<{}, states> {
    constructor() {
        super({})

        this.state = {
            cards: []
        }
    }

    async componentWillMount() {
        const cardDatas: Array<DiaryVO> = await this.findDiary();
        let cards = [];

        const cardActions = [
            <Icon type="setting" />,
            <Icon type="edit"
                onClick={this.diaryEdit.bind(this)}
            />,
            <Icon type="delete" />
        ]

        for (let i = 0, len = cardDatas.length; i < len; i++) {
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
                            title={cardDatas[i].title}
                            description={cardDatas[i].desc}
                        />
                    </Card>
                </Row>
            )
        }

        if (cards.length === 0) {
            cards.push(<EemptyTips key={new Date().getTime()} />)
        }

        this.setState({
            cards: cards
        })
    }

    private findDiary(): Promise<Array<DiaryVO>> {
        return new Promise(async (resolve, reject) => {
            const result = await $http.post('/api/pyDiary/findAll')
            const data: Array<DiaryVO> = result.data
            resolve(data)
        })
    }

    private diaryEdit() {
        appHistory.push('/write-dirays');
    }

    render() {
        return (
            <Row type='flex'
                justify='center'
                className='diary-list'>
                {this.state.cards}
            </Row>
        )
    }
}