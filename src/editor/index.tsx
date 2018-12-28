import * as React from 'react';

import Editor, { Editable } from 'ory-editor-core'

import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'

import { createEmptyState } from 'ory-editor-core'

const editable = createEmptyState()

const editor = new Editor({
  plugins: {
    content: [image]
  },
  editables: [editable],
})


export default class PyEditor extends React.Component<{}, {}> {
    constructor() {
        super({})
    }

    render() {
        return (
            <Editable
                id="editor"
                editor={editor}
            />
        )
    }
}