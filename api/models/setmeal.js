const moment = require('moment');
moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  const Setmeal = sequelize.define('setmeal', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      allowEmpty: false
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      allowEmpty: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      allowEmpty: false,
      get () {
        return Number(this.getDataValue('price'))
      }
    },
    status: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    },
    description: DataTypes.STRING(255),
    image: DataTypes.STRING(255),
    createUser: DataTypes.BIGINT,
    updateUser: DataTypes.BIGINT,
    createTime: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createTime') ? moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      }
    },
    updateTime: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updateTime') ? moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      }
    }
  }, {
    timestamps: true, // 启用时间戳
    createdAt: 'createTime', // 自定义 createdAt 字段名
    updatedAt: 'updateTime',
    underscored: true,
    sequelize
  });

  return Setmeal
}