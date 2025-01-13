const moment = require('moment');
moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('shopping_cart', {
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
    image: DataTypes.STRING(255),
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      allowEmpty: false
    },
    dishId: {
      type: DataTypes.BIGINT,
    },
    setmealId: {
      type: DataTypes.BIGINT,
    },
    dishFlavor: {
      type: DataTypes.STRING(50),
    },
    number: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '数量'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      get () {
        const value = this.getDataValue('amount');
        return Number(value)
      }
    },
    createTime: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createTime') ? moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      }
    },
  }, {
    updatedAt: false,
    underscored: true,
    createdAt: 'createTime', // 自定义 createdAt 字段名
    sequelize
  });

  return ShoppingCart
}