const Dao = () => {
    this.dao = require('./baseDao')('py_diary')
}
/**
* Dao
*/
Dao.prototype = {

}
module.exports = new Dao()