const Dao = () => {
    this.dao = require('./baseDao')('py_user')
}
/**
* Dao
*/
Dao.prototype = {

}
module.exports = new Dao()