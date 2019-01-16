const dao = require('./baseDao')('py_diary')

class pyDiaryDao extends dao {
    constructor() {
        super()
    }
}

module.exports = pyDiaryDao