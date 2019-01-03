import * as React from 'react'

import { Row, Col, Card, Icon } from 'antd'

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

    componentWillMount() {
        let cards = [];

        const cardTitles = [
            {
                title: '2018年',
                desc: '2018年我的潘小宝变胖了T T'
            },

            {
                title: '奶茶小目标',
                desc: '明年要喝更多奶茶呀~~~'
            },

            {
                title: '2019年',
                desc: '2019年我的潘小宝要变瘦呀!!!'
            },

            {
                title: '测试小目标',
                desc: '明年要干掉李俊啊啊啊啊~~~'
            }
        ]

        for (let i = 0; i < 4; i++) {
            let source = require(`@images/yw/pic${i + 1}.jpg`)
            cards.push(
                <Card
                    key={i}
                    style={{ width: 260 }}
                    cover={<img alt="example" src={source} style={{ width: 260, height: 150 }} />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                        title={cardTitles[i].title}
                        description={cardTitles[i].desc}
                    />
                </Card>
            )
        }

        this.setState({
            cards: cards
        })
    }

    render() {
        return (
            <Row type="flex" justify="space-around" style={{padding: 20}}>
                {this.state.cards}
            </Row>
        )
    }
}