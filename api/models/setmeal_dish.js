const sequelize = require('../config/mysql');
const { Sequelize, DataTypes, Model } = require("sequelize");
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');
const setmealDish = sequelize.define('setmealDish', {
  // 模型属性
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  setmeal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    allowEmpty: false
  },
  dish_id: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  name: {
    type: DataTypes.STRING,
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
  copies: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false, // 启用时间戳
  tableName: 'setmeal_dish',
  sequelize
});

module.exports = setmealDish