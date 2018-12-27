import * as React from 'react'

import { Table } from 'antd'

// antd table store
import antdTableStore from 'store/antdTableStore'

import { observer } from 'mobx-react'

@observer
export default class AntdTable extends React.Component {
    public render() {
        return (
            <Table
                columns={antdTableStore.columns}
                bordered
            />
        )
    }
}