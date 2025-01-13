const moment = require('moment');
moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('order_detail', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键'
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: '名字'
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '图片'
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '订单id'
    },
    dishId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '菜品id'
    },
    setmealId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '套餐id'
    },
    dishFlavor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '口味'
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '数量'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '金额',
      get () {
        return Number(this.getDataValue('amount'))
      }
    }
  }, {
    underscored: true,
    timestamps: false
  });

  return OrderDetail
};