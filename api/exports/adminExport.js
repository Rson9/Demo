const adminLoginRoute = require('@routes/admin/employee/loginRoute')
const adminCategoryRoute = require('@routes/admin/category/addRoute')
const adminDishRoute = require('@routes/admin/dish/addRoute')
const adminSetmealRoute = require('@routes/admin/setmeal/addRoute')
const adminUploadRoute = require('@routes/admin/common/upload')

module.exports = {
  adminLoginRoute,
  adminCategoryRoute,
  adminDishRoute,
  adminSetmealRoute,
  adminUploadRoute
}