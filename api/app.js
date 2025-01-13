require('dotenv').config()
require('module-alias/register');
const express = require('express')
const app = express()

const { sequelize } = require('@models')
const associations = require('@models/associations')

const { adminLoginRoute, adminCategoryRoute, adminDishRoute, adminSetmealRoute, adminUploadRoute } = require('./exports/adminExport')
const { userLoginRoute, userCategoryRoute, userDishRoute,
  userSetmealRoute, userShoppingCartRoute, userAddressBookRoute,
  userOrderRoute } = require('./exports/userExport')
const shopRoute = require('./routes/shop/statusRoute')
// const cookieParser = require('cookie-parser')
const adminAuth = require('./middlewares/admin-auth')
const userAuth = require('./middlewares/user-auth')

// app.use(cookieParser())
app.use(express.json())
app.use(express.static('public')) //设置静态文件目录

//数据库连接
async function init () {
  try {
    //建立关系
    associations()
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 同步数据库
    // await sequelize.sync({ alter: true });

  } catch (error) {
    console.error('数据库连接失败', error);
  }
}
init();


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
app.use('/user/order', userAuth, userOrderRoute);


app.listen(8080, () => {
  console.log("server running at port 8080");
})
