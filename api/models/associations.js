const { Category, Dish, Setmeal, DishFlavor, SetmealDish, Order, OrderDetail, AddressBook } = require('./index')

module.exports = () => {

  Category.hasMany(Dish, { foreignKey: 'categoryId' })
  Dish.belongsTo(Category, { foreignKey: 'categoryId' })

  Category.hasMany(Setmeal, { foreignKey: 'categoryId' })
  Setmeal.belongsTo(Category, { foreignKey: 'categoryId' })

  Dish.hasMany(DishFlavor, { foreignKey: 'dishId', as: 'flavors' })
  DishFlavor.belongsTo(Dish, { foreignKey: 'dishId' })

  Setmeal.hasMany(SetmealDish, { foreignKey: 'setmealId' })
  SetmealDish.belongsTo(Setmeal, { foreignKey: 'setmealId' })

  Setmeal.belongsToMany(Dish, { through: SetmealDish, foreignKey: 'setmealId' })
  Dish.belongsToMany(Setmeal, { through: SetmealDish, foreignKey: 'dishId' })

  //订单表和订单详情表的关系
  Order.hasMany(OrderDetail, { foreignKey: 'orderId', as: 'orderDetailList' })
  OrderDetail.belongsTo(Order, { foreignKey: 'orderId' })

  //订单表和地址表的关系
  Order.belongsTo(AddressBook, { foreignKey: 'addressBookId' })
  AddressBook.hasMany(Order, { foreignKey: 'addressBookId' })
}
