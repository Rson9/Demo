const moment = require('moment');
moment.locale('zh-cn');


module.exports = (sequelize, DataTypes) => {
  const DishFlavor = sequelize.define('dish_flavor', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      allowEmpty: false
    },
    dishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      allowEmpty: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      allowEmpty: false
    }
  }, {
    timestamps: false, // 关闭时间戳
    sequelize,
    underscored: true
  });

  return DishFlavor
}