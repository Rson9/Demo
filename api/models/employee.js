const sequelize = require('../config/mysql');
const { Sequelize, DataTypes, Model } = require("sequelize");
const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');
const Employee = sequelize.define('employee', {
  // 模型属性
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: '请输入用户名'
      },
      notEmpty: {
        msg: '请输入用户名'
      },
      len: { args: [2, 45], msg: '用户名长度在2到45之间' },
      async isUnique (value) {
        const user = await Employee.findOne({ where: { username: value } });
        if (user) {
          throw new Error('用户名已存在');
        }
      }

    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: bcrypt.hashSync('123456', 10),
    validate: {
      notNull: {
        msg: '密码必须填写'
      },
      notEmpty: {
        msg: '密码不能为空'
      }
    },
    set (value) {
      if (value.length < 6 || value.length > 45) throw new Error('密码长度在6到45之间')
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    }
  },
  phone: DataTypes.STRING,
  sex: DataTypes.STRING(2),
  idNumber: DataTypes.STRING,
  status: DataTypes.BOOLEAN,
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
  sequelize, modelName: 'Employee'
});
module.exports = Employee