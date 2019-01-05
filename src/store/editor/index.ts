import { computed, observable, action, trace, toJS } from 'mobx';

class editorStore {
    constructor() {

    }

    @observable editor: any = null

    /**
     * 同步表格列信息
     */
    @action setEditor(editor: any) {
        this.editor = editor
    }

    getValue(): string {
        return this.editor.getMarkdown()
    }
}

export default new editorStore()