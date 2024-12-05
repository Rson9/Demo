const sequelize = require('../config/mysql');
const { Sequelize, DataTypes, Model } = require("sequelize");
const Dish = require('./dish')
const Setmeal = require('./setmeal')
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');
const Category = sequelize.define('Category', {
  // 模型属性
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  type: {
    allowNull: false,
    allowEmpty: false,
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  sort: {
    type: DataTypes.INTEGER,
    allowNull: false,
    allowEmpty: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  create_user: DataTypes.STRING,
  update_user: DataTypes.STRING,
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

Category.hasMany(Dish, { foreignKey: 'category_id' })
Dish.belongsTo(Category, { foreignKey: 'category_id' })
Category.hasMany(Setmeal, { foreignKey: 'category_id' })
Setmeal.belongsTo(Category, { foreignKey: 'category_id' })
module.exports = Category