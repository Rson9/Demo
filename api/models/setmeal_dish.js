const moment = require('moment');
moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  const SetmealDish = sequelize.define('setmeal_dish', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    setmealId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      allowEmpty: false
    },
    dishId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      allowEmpty: false
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      allowEmpty: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      allowEmpty: false,
      get () {
        return Number(this.getDataValue('price'))
      }
    },
    copies: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    underscored: true,
    sequelize
  });

  return SetmealDish
}