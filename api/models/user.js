const sequelize = require('../config/mysql');
const { DataTypes } = require("sequelize");
const moment = require('moment');
moment.locale('zh-cn');
const Flavor = require('./flavor');
const User = sequelize.define('User', {
  // 模型属性
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  openid: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING
  },
  sex: {
    type: DataTypes.TINYINT
  },
  id_Number: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
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
  sequelize
});

module.exports = User