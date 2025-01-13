const moment = require('moment');
moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  const ShopStatus = sequelize.define('shop_status', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    }
  }, {
    timestamps: false, // 启用时间戳
    tableName: 'shop_status',
    sequelize
  });

  return ShopStatus
}