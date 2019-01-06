import { observable, action, toJS } from 'mobx';

class editorStore {
    constructor() {

    }

    @observable editor: any = null

    @action setEditor(editor: any) {
        this.editor = editor
    }

    getValue(): string {
        return this.editor.getMarkdown()
    }
}

export default new editorStore()