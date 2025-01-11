const express = require('express')
const app = express()

const sequelize = require('./config/mysql')
require('dotenv').config()
require('module-alias/register');
const { adminLoginRoute, adminCategoryRoute, adminDishRoute, adminSetmealRoute, adminUploadRoute } = require('./exports/adminExport')
const { userLoginRoute, userCategoryRoute, userDishRoute, userSetmealRoute, userShoppingCartRoute, userAddressBookRoute } = require('./exports/userExport')
const shopRoute = require('./routes/shop/statusRoute')
// const cookieParser = require('cookie-parser')
const adminAuth = require('./middlewares/admin-auth')
const userAuth = require('./middlewares/user-auth')

// app.use(cookieParser())
app.use(express.json())
app.use(express.static('public')) //设置静态文件目录

// 后台管理端
app.use('/admin/employee', adminAuth, adminLoginRoute);
app.use('/admin/category', adminAuth, adminCategoryRoute);
app.use('/admin/dish', adminAuth, adminDishRoute);
app.use('/admin/shop', adminAuth, shopRoute);
app.use('/admin/setmeal', adminAuth, adminSetmealRoute);
app.use('/admin/common', adminUploadRoute);


//微信小程序
app.use('/user/user', userLoginRoute);
app.use('/user/category', userAuth, userCategoryRoute);
app.use('/user/dish', userAuth, userDishRoute);
app.use('/user/setmeal', userAuth, userSetmealRoute);
app.use('/user/shoppingCart', userAuth, userShoppingCartRoute);
app.use('/user/addressBook', userAuth, userAddressBookRoute);


app.listen(8080, () => {
  console.log("server running at port 8080");
})
