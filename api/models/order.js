const moment = require('moment');
moment.locale('zh-cn');

//订单表
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键'
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '订单号'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '订单状态 1待付款 2待接单 3已接单 4派送中 5已完成 6已取消 7退款'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '下单用户'
    },
    addressBookId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '地址id'
    },
    orderTime: {
      type: DataTypes.DATE,
      allowNull: false,
      get () {
        return this.getDataValue('orderTime') ? moment(this.getDataValue('orderTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      },
      comment: '下单时间'
    },
    checkoutTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '结账时间',
      get () {
        return this.getDataValue('checkoutTime') ? moment(this.getDataValue('checkoutTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      },
    },
    payMethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '支付方式 1微信,2支付宝'
    },
    payStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '支付状态 0未支付 1已支付 2退款'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '实收金额',
      get () {
        return Number(this.getDataValue('amount'))
      }
    },
    remark: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '备注'
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true,
      comment: '手机号'
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '地址'
    },
    userName: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: '用户名称'
    },
    consignee: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: '收货人'
    },
    cancelReason: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '订单取消原因'
    },
    rejectionReason: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '订单拒绝原因'
    },
    cancelTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '订单取消时间',
      get () {
        return this.getDataValue('cancelTime') ? moment(this.getDataValue('cancelTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      },
    },
    estimatedDeliveryTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '预计送达时间',
      get () {
        return this.getDataValue('estimatedDeliveryTime') ? moment(this.getDataValue('estimatedDeliveryTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      },
    },
    deliveryStatus: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
      comment: '配送状态 1立即送出 0选择具体时间'
    },
    deliveryTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '送达时间',
      get () {
        return this.getDataValue('deliveryTime') ? moment(this.getDataValue('deliveryTime')).format('YYYY-MM-DD HH:mm:ss') : null;
      },
    },
    packAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '打包费'
    },
    tablewareNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '餐具数量'
    },
    tablewareStatus: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
      comment: '餐具数量状态 1按餐量提供 0选择具体数量'
    }
  }, {
    timestamps: false,
    underscored: true
  });

  return Order
};