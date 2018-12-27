import * as React from 'react'

import { Input, Modal } from 'antd'

import { observer } from 'mobx-react'

// codeStore mobx
import codeStore from 'store/codeStore'

// antd table store
import antdTableStore from 'store/antdTableStore'

const { TextArea } = Input

@observer
export default class Code extends React.Component<{}> {
    public render() {
        return (
            <Modal title='antd table column config'
                visible={codeStore.visible}
                footer={null}
                onCancel={() => {
                    codeStore.setVisible(false)
                }}
                onOk={() => {
                    codeStore.setVisible(false)
                }}
            >
                <TextArea
                    autosize={{minRows: 16, maxRows: 16}}
                    value={JSON.stringify(antdTableStore.columns, null, 4)}
                />
            </Modal>
        )
    }
}