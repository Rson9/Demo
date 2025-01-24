const adminLoginRoute = require('@routes/admin/employee/loginRoute')
const adminCategoryRoute = require('@routes/admin/category/addRoute')
const adminDishRoute = require('@routes/admin/dish/addRoute')
const adminSetmealRoute = require('@routes/admin/setmeal/addRoute')
const adminOrderRoute = require('@routes/admin/order/orderRoute')
const adminWorkSpaceRoute = require('@routes/admin/workspace/workspaceRoute')
const adminReportRoute = require('@routes/admin/report/reportRoute')
const adminUploadRoute = require('@routes/admin/common/upload')

module.exports = {
  adminLoginRoute,
  adminCategoryRoute,
  adminDishRoute,
  adminSetmealRoute,
  adminOrderRoute,
  adminWorkSpaceRoute,
  adminReportRoute,
  adminUploadRoute
}