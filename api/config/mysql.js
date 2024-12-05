const { Sequelize } = require('sequelize');

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('takeout', 'root', '123456', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});
module.exports = sequelize