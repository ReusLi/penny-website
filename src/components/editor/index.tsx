import * as React from 'react';

import Editor from 'wrap-md-editor'

import editorStore from 'store/editor'

export default class PyEditor extends React.Component<{}, {}> {
    render() {
        return (
            <Editor
                style={{ height: '100%' }}
                config={
                    {
                        height: '100%',
                        markdown: `### ${new Date().toLocaleDateString()}`,
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