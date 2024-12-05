const sequelize = require('../config/mysql');
const { Sequelize, DataTypes, Model } = require("sequelize");
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');

const Flavor = sequelize.define('Flavor', {
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
  dish_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    allowEmpty: false
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  }
}, {
  timestamps: false, // 启用时间戳
  sequelize
});
module.exports = Flavor