import * as React from 'react'

import { Row, Col, Card, Icon } from 'antd'

import EemptyTips from './emptyTips'

import './diaryList.css'

const { Meta } = Card

interface states {
    cards: any
}

const cardDatas: any = [
    {
        title: '2018年',
        desc: '2018年要开开心心~'
    },
    {
        title: '2018年',
        desc: '2018年要开开心心~'
    },
    {
        title: '2018年',
        desc: '2018年要开开心心~'
    },
    {
        title: '2018年',
        desc: '2018年要开开心心~'
    }
]

export default class DiaryList extends React.Component<{}, states> {
    constructor() {
        super({})

        this.state = {
            cards: []
        }
    }

    componentWillMount() {
        let cards = [];

        const cardActions = [<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]

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
            cards.push(<EemptyTips />)
        }

        this.setState({
            cards: cards
        })
    }

    render() {
        return (
            <Row type='flex'
                align='middle'
                justify='center'
                className='diary-list'>
                {this.state.cards}
            </Row>
        )
    }
}