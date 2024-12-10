const sequelize = require('../config/mysql');
const { DataTypes } = require("sequelize");
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');
const ShopStatus = sequelize.define('shopstatus', {
  // 模型属性
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  }
}, {
  timestamps: false, // 启用时间戳
  tableName: 'shopStatus',
  sequelize
});
module.exports = ShopStatus