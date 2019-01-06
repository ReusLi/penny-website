import * as React from 'react';

import Editor from 'wrap-md-editor'

import editorStore from 'store/editor'
import diaryStore from 'store/diary'

import { observer } from 'mobx-react';

const markdown = `### ${new Date().toLocaleDateString()}`

@observer
export default class PyEditor extends React.Component<{}, {}> {
    private isModifyMode: boolean

    componentWillMount() {
        this.checkModifyMode()
    }

    private checkModifyMode() {
        this.isModifyMode = diaryStore.isModifyMode()
    }

    render() {
        const markdownValue: string = this.isModifyMode
            ? diaryStore.curDiaryModel.content
            : markdown
        return (
            <Editor
                style={{ height: '100%' }}
                config={
                    {
                        height: '100%',
                        markdown: markdownValue,
                        onload: (editor: any, func: any) => {
                            let md = editor.getMarkdown();
                            let html = editor.getHTML();
                            editorStore.setEditor(editor);
                        }
                    }
                } />
        )
    }
}