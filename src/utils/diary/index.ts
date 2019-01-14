import { DiaryVO } from 'interface/diary'

class diaryUtil {
    getDiaryVO(): DiaryVO {
        return {
            id: '',
            title: '',
            userId: '',
            desc: '',
            content: '',
            createTime: '',
            updateTime: ''
        }
    }
}

export default new diaryUtil()