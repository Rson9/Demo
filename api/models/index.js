const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config/mysql').development;
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})

const AddressBook = require('./address_book')
  (sequelize, DataTypes)
const Category = require('./category')
  (sequelize, DataTypes)
const Dish = require('./dish')
  (sequelize, DataTypes)
const Employee = require('./employee')
  (sequelize, DataTypes)
const DishFlavor = require('./dish_flavor')
  (sequelize, DataTypes)
const OrderDetail = require('./order_detail')
  (sequelize, DataTypes)
const Order = require('./order')
  (sequelize, DataTypes)

const SetmealDish = require('./setmeal_dish')
  (sequelize, DataTypes)

const Setmeal = require('./setmeal')
  (sequelize, DataTypes)
const ShoppingCart = require('./shopping_cart')
  (sequelize, DataTypes)
const ShopStatus = require('./shop_status')
  (sequelize, DataTypes)
const User = require('./user')
  (sequelize, DataTypes)
module.exports = {
  sequelize,
  AddressBook,
  Category,
  Dish,
  Employee,
  DishFlavor,
  OrderDetail,
  Order,
  SetmealDish,
  Setmeal,
  ShoppingCart,
  ShopStatus,
  User
}