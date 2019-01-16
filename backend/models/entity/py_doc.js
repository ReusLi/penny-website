module.exports = (sequelize, DataTypes) => {
    const entity = sequelize.define('py_doc', {
        id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: false, comment: 'uuid' },
        name: { type: DataTypes.STRING(100), allowNull: false, comment: '函数名' },
        param: { type: DataTypes.STRING(36), allowNull: false, comment: '参数' },
        return: { type: DataTypes.STRING(36), allowNull: false, comment: '返回值' },
        comment: { type: DataTypes.STRING(36), allowNull: false, comment: '注释' }
    }, {
            underscored: false,
            timestamps: true,
            freezeTableName: true,
            comment: '用户信息表'
        });

    return entity;
}
