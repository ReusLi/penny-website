const dao = require('./baseDao')('py_doc')

class pyDocDao extends dao {
    constructor(...args) {
        super(...args)
    }
}

module.exports = pyDocDao