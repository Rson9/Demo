const sequelize = require('../config/mysql');
const { Sequelize, DataTypes, Model } = require("sequelize");
const Category = require('./category')
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');
const Dish = sequelize.define('Dish', {
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
  category_id: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  description: DataTypes.STRING,
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
module.exports = Dish