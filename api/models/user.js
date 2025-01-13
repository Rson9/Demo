const moment = require('moment');

moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
      comment: '主键'
    },
    openid: {
      type: DataTypes.STRING(45),
      allowNull: false,
      allowEmpty: false,
      comment: '微信用户唯一标识'
    },
    name: {
      type: DataTypes.STRING(32),
    },
    phone: {
      type: DataTypes.STRING(11)
    },
    sex: {
      type: DataTypes.STRING(2)
    },
    idNumber: {
      type: DataTypes.STRING(18)
    },
    avatar: {
      type: DataTypes.STRING(500)
    },
    createTime: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createTime') ? moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      }
    }
  }, {
    createdAt: 'createTime', // 自定义 createdAt 字段名
    updatedAt: false,
    underscored: true,
    sequelize
  });

  return User
}