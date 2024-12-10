const sequelize = require('../config/mysql');
const { Sequelize, DataTypes, Model } = require("sequelize");
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');
const Dish = require('./dish');
const setmealDish = require('./setmeal_dish');
const Setmeal = sequelize.define('Setmeal', {
  // 模型属性
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  category_id: {
    type: DataTypes.INTEGER,
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
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1
  },
  description: DataTypes.STRING,
  image: {
    type: DataTypes.STRING,
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

Setmeal.belongsToMany(Dish, { through: setmealDish, foreignKey: 'dish_id' })
Dish.belongsToMany(Setmeal, { through: setmealDish, foreignKey: 'setmeal_id' })
Setmeal.hasMany(setmealDish, { foreignKey: 'setmeal_id' })
setmealDish.belongsTo(Setmeal, { foreignKey: 'setmeal_id' })
module.exports = Setmeal