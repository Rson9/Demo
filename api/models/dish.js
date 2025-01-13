const moment = require('moment');
moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('dish', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      allowEmpty: false
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      allowEmpty: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      get () {
        const value = this.getDataValue('price')
        return Number(value)
      }

    },
    image: {
      type: DataTypes.STRING(255),
    },
    description: DataTypes.STRING(255),
    status: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    },
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
    createdAt: 'createTime', // 自定义 createdAt 字段名
    updatedAt: 'updateTime',
    sequelize,
    underscored: true
  });
  return Dish
}