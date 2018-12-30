import * as React from 'react';

import Editor from 'wrap-md-editor'

export default class PyEditor extends React.Component<{}, {}> {

    render() {
        return (
            <Editor config={
                {
                    markdown: // testEditor.getMarkdown().replace(/`/g, '\\`')
                        `## Test
                    \`\`\`
                    console.log('what can i do for you')
                    \`\`\`
                    
                    # 123123`,
                    onload: (editor: any, func: any) => {
                        let md = editor.getMarkdown();
                        let html = editor.getHTML();
                    }
                }
            } />
        )
    }
}