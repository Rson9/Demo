const moment = require('moment');
moment.locale('zh-cn');
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    type: {
      allowNull: false,
      allowEmpty: false,
      type: DataTypes.TINYINT,
      validators: {
        isIn: {
          args: [[1, 2]],
          msg: 'type must be 1 or 2'
        }
      },
      comment: '1:菜品分类 2:套餐分类'
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      allowEmpty: false
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      allowEmpty: false,
      defaultValue: 0
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
    timestamps: true, // 启用时间戳
    createdAt: 'createTime', // 自定义 createdAt 字段名
    updatedAt: 'updateTime',
    underscored: true,
    sequelize
  });
  return Category
}