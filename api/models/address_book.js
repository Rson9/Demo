const sequelize = require('../config/mysql');
const { Sequelize, DataTypes, Model } = require("sequelize");
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');

const addressBook = sequelize.define('addressBook', {
  // 模型属性
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    allowEmpty: false
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  sex: DataTypes.STRING(2),
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  province_code: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  province_name: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  city_code: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  city_name: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  district_code: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  district_name: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  label: DataTypes.STRING,
  is_default: DataTypes.TINYINT(1)
}, {
  timestamps: false, // 关闭时间戳
  sequelize,
  tableName: 'address_book'
});
module.exports = addressBook