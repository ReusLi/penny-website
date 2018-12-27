const Dao = (modelName) => {
    this.dao=require('./baseDao')(modelName)
}
/**
* Dao
*/
Dao.prototype = {
    
}
module.exports = (modelName) => {
    return new Dao(modelName);
}