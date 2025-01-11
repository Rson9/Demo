const sequelize = require('../config/mysql');
const { Sequelize, DataTypes, Model } = require("sequelize");
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');
const ShoppingCart = sequelize.define('ShoppingCart', {
  // 模型属性
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  image: DataTypes.STRING,
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    allowEmpty: false
  },
  dish_id: {
    type: DataTypes.INTEGER,
  },
  setmeal_id: {
    type: DataTypes.INTEGER,
  },
  dish_flavor: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.INTEGER,
    defaultValue: 1
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
  timestamps: true, // 启用时间戳
  updatedAt: false,
  createdAt: 'createTime', // 自定义 createdAt 字段名
  tableName: 'shopping_cart',
  sequelize
});



module.exports = ShoppingCart