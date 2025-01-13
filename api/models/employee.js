const moment = require('moment');
moment.locale('zh-cn');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('employee', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: DataTypes.STRING(32),
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      allowEmpty: false,
      validate: {
        async isUnique (value) {
          const user = await Employee.findOne({ where: { username: value } });
          if (user) {
            throw new Error('账号已存在');
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING(64),
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
    phone: DataTypes.STRING(11),
    sex: DataTypes.STRING(2),
    idNumber: {
      type: DataTypes.STRING(18),
      allowNull: false,
      allowEmpty: false
    },
    status: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    },
    createUser: DataTypes.BIGINT,
    updateUser: DataTypes.BIGINT,
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
    createdAt: 'createTime', // 自定义 createdAt 字段名
    updatedAt: 'updateTime',
    underscored: true,
    sequelize,
  });
  return Employee;
}