const express = require('express')
const loginRoute = require('./routes/employee/loginRoute')
const categoryRoute = require('./routes/category/addRoute')
const dishRoute = require('./routes/dish/addRoute')
const shopRoute = require('./routes/shop/statusRoute')
const setmealRoute = require('./routes/setmeal/addRoute')
// const cookieParser = require('cookie-parser')
const adminAuth = require('./middlewares/admin-auth')
const app = express()
const sequelize = require('./config/mysql')
require('dotenv').config()
// app.use(cookieParser())
app.use(express.json())


app.use('/admin/employee', adminAuth, loginRoute);
app.use('/admin/category', adminAuth, categoryRoute);
app.use('/admin/dish', adminAuth, dishRoute);
app.use('/admin/shop', adminAuth, shopRoute);
app.use('/admin/setmeal', adminAuth, setmealRoute);
app.listen(8080, () => {
  console.log("server running at port 8080");
})
