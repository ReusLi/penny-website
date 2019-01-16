const dao = require('./baseDao')('py_user')

class pyUserDao extends dao {
    constructor() {
        super()
    }
}

module.exports = pyUserDao