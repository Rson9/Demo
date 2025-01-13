const moment = require('moment');
moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  const AddressBook = sequelize.define('address_book', {
    // 模型属性
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      allowEmpty: false
    },
    consignee: {
      type: DataTypes.STRING(50),
      allowNull: false,
      allowEmpty: false
    },
    sex: DataTypes.STRING(2),
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      allowEmpty: false
    },
    provinceCode: {
      type: DataTypes.STRING(12),
      allowNull: false,
      allowEmpty: false
    },
    provinceName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      allowEmpty: false
    },
    cityCode: {
      type: DataTypes.STRING(12),
      allowNull: false,
      allowEmpty: false
    },
    cityName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      allowEmpty: false
    },
    districtCode: {
      type: DataTypes.STRING(12),
      allowNull: false,
      allowEmpty: false
    },
    districtName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      allowEmpty: false
    },
    detail: {
      type: DataTypes.STRING(200),
      allowNull: false,
      allowEmpty: false
    },
    label: DataTypes.STRING(100),
    isDefault: DataTypes.TINYINT(1)
  }, {
    timestamps: false, // 关闭时间戳
    sequelize,
    underscored: true
  });

  return AddressBook
}