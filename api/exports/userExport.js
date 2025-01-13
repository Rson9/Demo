const userLoginRoute = require('@routes/user/user/userLogin')
const userCategoryRoute = require('@routes/user/category/userList')
const userDishRoute = require('@routes/user/dish/dishList')
const userSetmealRoute = require('@routes/user/setmeal/setmealRoute')
const userShoppingCartRoute = require('@routes/user/shoppingCart/cartRoute')
const userAddressBookRoute = require('@routes/user/addressBook/address')
const userOrderRoute = require('@routes/user/order/orderRoute')
module.exports = {
  userLoginRoute,
  userCategoryRoute,
  userDishRoute,
  userSetmealRoute,
  userShoppingCartRoute,
  userAddressBookRoute,
  userOrderRoute
}