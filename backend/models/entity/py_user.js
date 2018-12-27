module.exports = function (sequelize, DataTypes) {
    const entity = sequelize.define('py_user', {
        id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: false, comment: 'uuid' },
        user: { type: DataTypes.STRING(20), allowNull: true, comment: '用户名' },
    }, {
            underscored: false,
            timestamps: false,
            freezeTableName: true,
            comment: '页面'
        });

    return entity;
}
