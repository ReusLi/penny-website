import { observable, action } from 'mobx'

class codeStore {
    @observable visible: boolean = false

    @action setVisible(visible: boolean) {
        this.visible = visible
    }
}

export default new codeStore()
