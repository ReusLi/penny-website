module.exports = (sequelize, DataTypes) => {
    const entity = sequelize.define('py_diary', {
        id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: false, comment: 'uuid' },
        userId: { type: DataTypes.STRING(36), allowNull: false, comment: '用户id' },
        diaryContent: { type: DataTypes.TEXT, allowNull: true, comment: '日记内容' },
        createTime: { type: DataTypes.DATE, allowNull: false, comment: '创建时间' },
        updateTime: { type: DataTypes.DATE, allowNull: false, comment: '最后一次更新时间' }
    }, {
            underscored: false,
            timestamps: false,
            freezeTableName: true,
            comment: '日记文章表'
        });

    return entity;
}
