import * as React from 'react'

import { Link } from "react-router-dom";

import { Button } from 'antd'

export default class EmptyTips extends React.Component<{}, {}> {
    render() {
        return (
            <Button 
                type='primary'
                size='large'>
                <Link to="/write-dirays">创建日记</Link>
            </Button>
        )
    }
}